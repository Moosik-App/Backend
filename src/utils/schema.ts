import { boolean, integer, pgSchema, text, timestamp } from "drizzle-orm/pg-core";

export const schema = pgSchema("moosik");

export const users = schema.table("users", {
    uuid: text('uuid').primaryKey(),
    username: text('username').unique().notNull(),
    password: text('password').notNull(),
    avatar_url: text('avatar_url').default(null),
    banner_url: text('banner_url').default(null),
    totalScrobbles: integer('totalScrobbles').default(0),
    perms: integer('perms').default(0),
    createdAt: timestamp('createdAt').defaultNow(),
    hashedRt: text('hashedRt'),
    isBanned: boolean('isBanned').default(false),
    banReason: text('banReason').default('No Reason Specified'),
    ipAddr: text('hashedIpAddress')
});