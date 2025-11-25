import { pgTable, serial, bigint, text } from "drizzle-orm/pg-core"

export const companies = pgTable("companies", {
    id: serial().primaryKey(),
    ruc: bigint({ mode: "number" }).notNull(),
    company_name: text().notNull(),
    taxpayer_status: text().notNull(),
    address_condition: text().notNull(),
    ubigeo: text(),
    road_type: text(),
    road_name: text(),
    zone_code: text(),
    zone_type: text(),
    number: text(),
    interior: text(),
    lote: text(),
    apartment: text(),
    block: text(),
    kilometer: text(),
});