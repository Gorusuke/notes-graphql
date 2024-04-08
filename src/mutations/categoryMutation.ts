import { eq } from "drizzle-orm";
import { db } from "../db.ts";
import { categories } from "../drizzle/categoriesSchema.ts";
import { handleError } from "../utils.ts";
import { notes } from "../drizzle/notesSchema.ts";
import { getAllCategories } from "../query/categoryQuery.ts";

export const addCategories = async (root, args) => {
  const { name } = args;
  if (!name) handleError('name field is required')

  const { rowsAffected, lastInsertRowid } = await db.insert(categories).values({ name })
  if (rowsAffected > 0) {
    const [lastNote] = await db.select().from(categories).where(eq(categories.id, Number(lastInsertRowid)))
    return lastNote;
  }
}

export const deleteCategories = async (root, args) => {
  const id = Number(args.id);
  if (!id || isNaN(id)) handleError()

  await db.delete(notes).where(eq(notes.categoryId, id))
  await db.delete(categories).where(eq(categories.id, id))
  return getAllCategories()
}