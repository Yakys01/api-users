-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"document" integer,
	"father_lastname" text,
	"mother_lastname" text,
	"names" text,
	"birth_date" date,
	"registration_date" date,
	"issue_date" date,
	"expiration_date" date,
	"birth_ubigeo" text,
	"address_ubigeo" text,
	"address" text,
	"gender" smallint,
	"civil_status" text,
	"digit_ruc" smallint,
	"mother" text,
	"father" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_users_document" ON "users" USING btree ("document" int4_ops);
*/