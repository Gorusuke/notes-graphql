import { eq } from "drizzle-orm";
import { notes } from "../drizzle/notesSchema.ts";
import { db } from "../db.ts";
import { getAllNotes } from "../query/noteQuery.ts";
import { handleError } from "../utils.ts";

export const addNote = async (root, args) => {
  const { title, description } = args;
  if (!title || !description) handleError('title and description fields are required')

  const { lastInsertRowid } = await db.insert(notes).values({ title, description })
  const [lastNote] = await db.select().from(notes).where(eq(notes.id, Number(lastInsertRowid)))
  return lastNote;
}

export const updateNotes = async (root, args) => {
  const { title, description, id: noteId } = args;
  const id = Number(noteId);
  if (!title || !description) handleError('title and description fields are required')
  if (!id || isNaN(id)) handleError()

  const { rowsAffected } = await db.update(notes).set({ title, description }).where(eq(notes.id, id))
  if (rowsAffected > 0) {
    const [lastNote] = await db.select().from(notes).where(eq(notes.id, Number(id)))
    return lastNote;
  }
}

export const updateNotesByCategoryId = async (root, args) => {
  const { id, categoryId } = args;
  const numberId = Number(id);
  const idCategory = Number(categoryId);

  if (!idCategory || isNaN(idCategory)) handleError('CategoryId must be a valid number')
  if (!numberId || isNaN(numberId)) handleError()

  await db.update(notes).set({ categoryId: idCategory }).where(eq(notes.id, numberId))
  const [updatedNote] = await db.select().from(notes).where(eq(notes.id, numberId))
  return updatedNote
}

export const updateArchiveNote = async (root, args) => {
  const id = Number(args.id);
  if (!id || isNaN(id)) handleError()

  await db.update(notes).set({ categoryId: 1 }).where(eq(notes.id, id))
  const [updatedNote] = await db.select().from(notes).where(eq(notes.id, id))
  return updatedNote
}

export const updateUnarchiveNote = async (root, args) => {
  const id = Number(args.id);
  if (!id || isNaN(id)) handleError()

  await db.update(notes).set({ categoryId: 2 }).where(eq(notes.id, id))
  const [updatedNote] = await db.select().from(notes).where(eq(notes.id, id))
  return updatedNote
}

export const deleteNotes = async (root, args) => {
  const id = Number(args.id);
  if (!id || isNaN(id)) handleError()

  await db.delete(notes).where(eq(notes.id, id))
  return getAllNotes()
}