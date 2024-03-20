ALTER SCHEMA "moosik" RENAME TO "moofm";
--> statement-breakpoint
ALTER TABLE "moofm"."users" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "moofm"."users" ADD COLUMN "membership" text;--> statement-breakpoint
ALTER TABLE "moofm"."users" ADD COLUMN "membershipExpDate" timestamp;--> statement-breakpoint
ALTER TABLE "moofm"."users" DROP COLUMN IF EXISTS "hashedIpAddress";--> statement-breakpoint
ALTER TABLE "moofm"."users" ADD CONSTRAINT "users_membership_unique" UNIQUE("membership");