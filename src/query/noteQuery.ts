import { GraphQLError } from "graphql"
import { db } from "../db.js"
import { notes } from "../drizzle/notesSchema.js"
import { eq, like } from "drizzle-orm"
import { handleError } from "../utils.js"

export const getAllNotes = async () => {
  const allNotes = await db.select().from(notes).all()
  return allNotes
}

export const getNotesCount = async () => {
  const allNotes = await db.select().from(notes).all()
  return allNotes.length
}

export const getNoteById = async (root, args: { id: string }) => {
  const id = Number(args.id)
  if (!id || isNaN(id)) handleError()

  const [note] = await db.select().from(notes).where(eq(notes.id, id))
  return note
}

export const getNotesByCategoryId = async (root, args: { categoryId: string }) => {
  const id = Number(args.categoryId)
  if (!id || isNaN(id)) handleError('CategoryId must be a valid number')

  const newId = id.toFixed(1)
  const categoriesNotes = await db.select().from(notes).where(like(notes.categoryId, newId))
  return categoriesNotes;
}