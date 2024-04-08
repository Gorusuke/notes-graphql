import { db } from "../db.ts";
import { categories } from "../drizzle/categoriesSchema.ts";

export const getAllCategories = async () => {
  const allCategories = await db.select().from(categories).all()
  return allCategories;
}