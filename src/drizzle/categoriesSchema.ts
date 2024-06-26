import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: integer("id", { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique()
});