import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ⚠️ dotenv MUST run before importing payload config (which reads process.env at module level)
config({ path: resolve(__dirname, '../.env'), override: true })

// Dynamic import so env vars are already loaded
const { getPayload } = await import('payload')
const { default: payloadConfig } = await import('../src/payload.config')

async function main() {
  console.log('🔌 Conectando a Payload via local API...')
  const payload = await getPayload({ config: payloadConfig })

  // 1) List existing users
  console.log('\n🔍 Usuarios existentes:')
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 50,
    overrideAccess: true,
  })
  console.log(`   ${existingUsers.totalDocs} usuario(s):`)
  existingUsers.docs.forEach((u: any) => {
    console.log(`   - id=${u.id}  email=${u.email}  role=${u.role}`)
  })

  // 2) Create or update superadmin (Kevin)
  const superEmail = 'herreracalle7672@gmail.com'
  const superPass = 'Jsxz0y0a_Uhqrf7zw'
  const superUser = existingUsers.docs.find((u: any) => u.email === superEmail)

  if (superUser) {
    console.log(`\n🔧 ${superEmail} existe (role=${superUser.role}). Actualizando a superadmin...`)
    await payload.update({
      collection: 'users',
      id: superUser.id,
      data: { role: 'superadmin', password: superPass },
      overrideAccess: true,
    })
    console.log(`✅ ${superEmail} → superadmin (contraseña actualizada)`)
  } else {
    console.log(`\n🆕 ${superEmail} no existe. Creando...`)
    await payload.create({
      collection: 'users',
      data: {
        email: superEmail,
        password: superPass,
        role: 'superadmin',
      },
      overrideAccess: true,
    })
    console.log(`✅ ${superEmail} creado como superadmin`)
  }

  // 3) Ensure betaonair007@gmail.com is admin
  const adminEmail = 'betaonair007@gmail.com'
  const adminUser = existingUsers.docs.find((u: any) => u.email === adminEmail)

  if (!adminUser) {
    console.log(`\n🆕 ${adminEmail} no existe. Creando como admin...`)
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: 'betaonair2024',
        role: 'admin',
      },
      overrideAccess: true,
    })
    console.log(`✅ ${adminEmail} creado como admin (contraseña: betaonair2024)`)
  } else if (adminUser.role !== 'admin') {
    console.log(`\n🔧 ${adminEmail} role=${adminUser.role}. Actualizando a admin...`)
    await payload.update({
      collection: 'users',
      id: adminUser.id,
      data: { role: 'admin' },
      overrideAccess: true,
    })
    console.log(`✅ ${adminEmail} → admin`)
  } else {
    console.log(`\n✅ ${adminEmail} ya es admin. No se requiere cambio.`)
  }

  // 4) Verify final state
  console.log('\n📋 Estado final:')
  const finalUsers = await payload.find({
    collection: 'users',
    limit: 50,
    overrideAccess: true,
  })
  finalUsers.docs.forEach((u: any) => {
    console.log(`   - id=${u.id}  email=${u.email}  role=${u.role}`)
  })

  console.log('\n🎉 Migración completada.')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
