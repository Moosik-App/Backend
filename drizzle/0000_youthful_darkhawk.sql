CREATE SCHEMA "moosik";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "moosik"."users" (
	"uuid" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"avatar_url" text DEFAULT null,
	"banner_url" text DEFAULT null,
	"totalScrobbles" integer DEFAULT 0,
	"perms" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"hashedRt" text,
	"isBanned" boolean DEFAULT false,
	"banReason" text DEFAULT 'No Reason Specified',
	"hashedIpAddress" text,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
