import { pgTable, serial, char, text, varchar, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const departments = pgTable("departments", {
    id: serial().primaryKey(),
    code: char({ length: 2 }).notNull(),
    name: text().notNull(),
});

export const provinces = pgTable("provinces", {
    id: serial().primaryKey(),
    code: char({ length: 4 }).notNull(),
    department_id: integer().notNull().references(() => departments.id),
    name: text().notNull(),
});

export const districts = pgTable("districts", {
    id: serial().primaryKey(),
    code: char({ length: 6 }).notNull(),
    province_id: integer().notNull().references(() => provinces.id),
    name: text().notNull(),
    capital_name: text(),
});

export const population_centers = pgTable("population_centers", {
    id: serial().primaryKey(),
    code: varchar({ length: 9 }).notNull(),
    district_id: integer().notNull().references(() => districts.id),
    name: text().notNull(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
    provinces: many(provinces),
}));

export const provincesRelations = relations(provinces, ({ one, many }) => ({
    department: one(departments, {
        fields: [provinces.department_id],
        references: [departments.id],
    }),
    districts: many(districts),
}));

export const districtsRelations = relations(districts, ({ one, many }) => ({
    province: one(provinces, {
        fields: [districts.province_id],
        references: [provinces.id],
    }),
    population_centers: many(population_centers),
}));

export const population_centersRelations = relations(population_centers, ({ one }) => ({
    district: one(districts, {
        fields: [population_centers.district_id],
        references: [districts.id],
    }),
}));