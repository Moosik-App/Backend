import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";


export default class dbClass {
    private static pool = new Pool({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.USERNAME,
        password: process.env.DB_PASSWORD
    })

    static db = drizzle(dbClass.pool, { schema: schema });
}