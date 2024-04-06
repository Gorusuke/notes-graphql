import { GraphQLError } from "graphql";
import { eq } from "drizzle-orm";
import { notes } from "../drizzle/notesSchema.ts";
import { db } from "../db.ts";

export const addNote = async (root, args) => {
  const { title, description } = args;
  if (!title || !description) {
    throw new GraphQLError('ID must be a valid number', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  const { rowsAffected, lastInsertRowid } = await db.insert(notes).values({ title, description })
  if (rowsAffected > 0) {
    const [lastNote] = await db.select().from(notes).where(eq(notes.id, Number(lastInsertRowid)))
    return lastNote;
  }
}

export const updateNotes = async (root, args) => {
  const { title, description, id: noteId } = args;
  const id = Number(noteId);
  if (!title || !description) {
    throw new GraphQLError('title and description fields are required', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  if (!id || isNaN(id)) {
    throw new GraphQLError('ID must be a valid number', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

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

  if (!idCategory || isNaN(idCategory)) {
    throw new GraphQLError('categoryId must be a valid number', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  if (!numberId || isNaN(numberId)) {
    throw new GraphQLError('ID must be a valid number', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  await db.update(notes).set({ categoryId: idCategory }).where(eq(notes.id, numberId))
  const [updatedNote] = await db.select().from(notes).where(eq(notes.id, numberId))
  return updatedNote
}

export const deleteNotes = async (root, args) => {
  const id = Number(args.id);

  if (!id || isNaN(id)) {
    throw new GraphQLError('ID must be a valid number', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  await db.delete(notes).where(eq(notes.id, id))
  const res = await db.select().from(notes).all()
  return res
}