import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Contacts } from './collections/Contacts'
import { Programs } from './collections/Programs'
import { Episodes } from './collections/Episodes'
import { News } from './collections/News'
import { Live } from './collections/Live'
import { Sponsorships } from './collections/Sponsorships'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { PageViews } from './collections/PageViews'
import { Settings } from './globals/Settings'
import { Seo } from './globals/Seo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        Analytics: {
          Component: '/components/admin/AnalyticsDashboard.tsx',
          path: '/analytics',
        },
      },
    },
  },
  collections: [Users, Media, Categories, Contacts, Programs, Episodes, News, Live, Sponsorships, Services, Projects, PageViews],
  globals: [Settings, Seo],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  email: resendAdapter({
    defaultFromAddress: 'no-reply@betaonair.com',
    defaultFromName: 'Beta On Air',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.R2_BUCKET_NAME || '',
      config: {
        endpoint: process.env.R2_ENDPOINT || undefined,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
      },
      acl: 'public-read',
    }),
  ],
})
