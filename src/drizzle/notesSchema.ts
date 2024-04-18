import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { categories } from "./categoriesSchema.js";

export const notes = sqliteTable("notes", {
  id: integer("id", { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id", { mode: 'number' }).references(() => categories.id).default(2)
});