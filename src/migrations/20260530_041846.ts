import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pageviews_section" AS ENUM('home', 'programs', 'live', 'news', 'sponsorships', 'services', 'contact', 'other');
  CREATE TYPE "public"."enum_pageviews_content_type" AS ENUM('podcast', 'video', 'noticia', 'servicio', 'portafolio', 'en-vivo', 'otro');
  CREATE TYPE "public"."enum_pageviews_device" AS ENUM('mobile', 'desktop', 'tablet');
  CREATE TABLE "pageviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"path" varchar NOT NULL,
  	"section" "enum_pageviews_section",
  	"program_id" integer,
  	"news_id" integer,
  	"service_id" integer,
  	"timestamp" timestamp(3) with time zone NOT NULL,
  	"content_type" "enum_pageviews_content_type" DEFAULT 'otro',
  	"content_slug" varchar,
  	"content_title" varchar,
  	"session_id" varchar,
  	"device" "enum_pageviews_device",
  	"country" varchar,
  	"referrer" varchar,
  	"duration" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'editor'::text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('superadmin', 'admin', 'editor');
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'editor'::"public"."enum_users_role";
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;
  ALTER TABLE "programs" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "programs" ALTER COLUMN "cover_image_id" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'published';
  ALTER TABLE "media" ADD COLUMN "sizes_program_logo_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_program_logo_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_program_logo_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_program_logo_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_program_logo_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_program_logo_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_program_cover_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_program_cover_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_program_cover_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_program_cover_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_program_cover_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_program_cover_filename" varchar;
  ALTER TABLE "programs" ADD COLUMN "logo_id" integer NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "service_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pageviews_id" integer;
  ALTER TABLE "pageviews" ADD CONSTRAINT "pageviews_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pageviews" ADD CONSTRAINT "pageviews_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pageviews" ADD CONSTRAINT "pageviews_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pageviews_program_idx" ON "pageviews" USING btree ("program_id");
  CREATE INDEX "pageviews_news_idx" ON "pageviews" USING btree ("news_id");
  CREATE INDEX "pageviews_service_idx" ON "pageviews" USING btree ("service_id");
  CREATE INDEX "pageviews_updated_at_idx" ON "pageviews" USING btree ("updated_at");
  CREATE INDEX "pageviews_created_at_idx" ON "pageviews" USING btree ("created_at");
  ALTER TABLE "programs" ADD CONSTRAINT "programs_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pageviews_fk" FOREIGN KEY ("pageviews_id") REFERENCES "public"."pageviews"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_sizes_program_logo_sizes_program_logo_filename_idx" ON "media" USING btree ("sizes_program_logo_filename");
  CREATE INDEX "media_sizes_program_cover_sizes_program_cover_filename_idx" ON "media" USING btree ("sizes_program_cover_filename");
  CREATE INDEX "programs_logo_idx" ON "programs" USING btree ("logo_id");
  CREATE INDEX "projects_service_idx" ON "projects" USING btree ("service_id");
  CREATE INDEX "payload_locked_documents_rels_pageviews_id_idx" ON "payload_locked_documents_rels" USING btree ("pageviews_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pageviews" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pageviews" CASCADE;
  ALTER TABLE "programs" DROP CONSTRAINT "programs_logo_id_media_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_service_id_services_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pageviews_fk";
  
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'editor'::text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'viewer');
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'editor'::"public"."enum_users_role";
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  DROP INDEX "media_sizes_program_logo_sizes_program_logo_filename_idx";
  DROP INDEX "media_sizes_program_cover_sizes_program_cover_filename_idx";
  DROP INDEX "programs_logo_idx";
  DROP INDEX "projects_service_idx";
  DROP INDEX "payload_locked_documents_rels_pageviews_id_idx";
  ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
  ALTER TABLE "programs" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "programs" ALTER COLUMN "cover_image_id" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'draft';
  ALTER TABLE "media" DROP COLUMN "sizes_program_logo_url";
  ALTER TABLE "media" DROP COLUMN "sizes_program_logo_width";
  ALTER TABLE "media" DROP COLUMN "sizes_program_logo_height";
  ALTER TABLE "media" DROP COLUMN "sizes_program_logo_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_program_logo_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_program_logo_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_program_cover_url";
  ALTER TABLE "media" DROP COLUMN "sizes_program_cover_width";
  ALTER TABLE "media" DROP COLUMN "sizes_program_cover_height";
  ALTER TABLE "media" DROP COLUMN "sizes_program_cover_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_program_cover_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_program_cover_filename";
  ALTER TABLE "programs" DROP COLUMN "logo_id";
  ALTER TABLE "projects" DROP COLUMN "service_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pageviews_id";
  DROP TYPE "public"."enum_pageviews_section";
  DROP TYPE "public"."enum_pageviews_content_type";
  DROP TYPE "public"."enum_pageviews_device";`)
}
