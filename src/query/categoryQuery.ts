import { db } from "../db.js";
import { categories } from "../drizzle/categoriesSchema.js";

export const getAllCategories = async () => {
  const allCategories = await db.select().from(categories).all()
  return allCategories;
}