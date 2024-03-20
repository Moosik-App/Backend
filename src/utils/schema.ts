import { boolean, integer, pgSchema, text, timestamp } from "drizzle-orm/pg-core";

export const schema = pgSchema("moofm");

export const users = schema.table("users", {
    uuid: text('uuid').primaryKey(),
    bio: text('bio'),
    membership:text('membership').unique(),
    banner_url: text('banner_url').default(null),
    avatar_url: text('avatar_url').default(null),
    username: text('username').unique().notNull(),
    totalScrobbles: integer('totalScrobbles').default(0),
    isBanned: boolean('isBanned').default(false),
    banReason: text('banReason').default('No Reason Specified'),
    password: text('password').notNull(),
    perms: integer('perms').default(0),
    hashedRt: text('hashedRt'),
    createdAt: timestamp('createdAt').defaultNow(),
    membershipExpDate: timestamp('membershipExpDate'),
});