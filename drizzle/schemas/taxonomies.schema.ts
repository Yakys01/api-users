import { pgTable, serial, jsonb, timestamp, varchar, text } from "drizzle-orm/pg-core"

export const taxonomies = pgTable("taxonomies", {
    id: serial().primaryKey(),
    module: varchar().notNull(), // 
    type: text().notNull(),
    category: text().notNull(),
    value: text().notNull(),
    json: jsonb(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp()
});