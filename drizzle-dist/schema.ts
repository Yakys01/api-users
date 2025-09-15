import { pgTable, uniqueIndex, serial, integer, text, date, smallint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	document: integer(),
	fatherLastname: text("father_lastname"),
	motherLastname: text("mother_lastname"),
	names: text(),
	birthDate: date("birth_date"),
	registrationDate: date("registration_date"),
	issueDate: date("issue_date"),
	expirationDate: date("expiration_date"),
	birthUbigeo: text("birth_ubigeo"),
	addressUbigeo: text("address_ubigeo"),
	address: text(),
	gender: smallint(),
	civilStatus: text("civil_status"),
	digitRuc: smallint("digit_ruc"),
	mother: text(),
	father: text(),
}, (table) => [
	uniqueIndex("idx_users_document").using("btree", table.document.asc().nullsLast().op("int4_ops")),
]);
