import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Ejecutar cada sentencia por separado para que un fallo no aborte las demás

  // Ignorar si prefix ya existe
  try {
    await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT 'media'`)
  } catch (e: any) {
    if (!e?.message?.includes?.('already exists')) throw e
  }

  // NUESTRA COLUMNA — lo que realmente necesitamos
  await db.execute(sql`ALTER TABLE "programs" ADD COLUMN IF NOT EXISTS "background_image_id" integer`)

  // FK constraint — con manejo de error por si ya existe
  try {
    await db.execute(sql`ALTER TABLE "programs" ADD CONSTRAINT "programs_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action`)
  } catch (e: any) {
    if (!e?.message?.includes?.('already exists')) throw e
  }

  // Índice
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "programs_background_image_idx" ON "programs" USING btree ("background_image_id")`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "programs" DROP CONSTRAINT IF EXISTS "programs_background_image_id_media_id_fk"`)
  await db.execute(sql`DROP INDEX IF EXISTS "programs_background_image_idx"`)
  await db.execute(sql`ALTER TABLE "programs" DROP COLUMN IF EXISTS "background_image_id"`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix"`)
}