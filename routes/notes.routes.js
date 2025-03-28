import { Router } from "express";
import protectRoute from '../middleware/auth.middleware.js';

import { createNewNote, deleteSingleNote, getAllNotes, getSingleNote, updateSingleNote } from '../controllers/notes.controller.js'

const notesRouter = Router();

// fetch all notes
notesRouter.get('/', protectRoute, getAllNotes)

// fetch a single note
notesRouter.get('/:id', protectRoute, getSingleNote)

// add a new note
notesRouter.post('/', protectRoute, createNewNote)

// update a note
notesRouter.put('/:id', protectRoute, updateSingleNote)

// delete a note
notesRouter.delete('/:id', protectRoute, deleteSingleNote)

export default notesRouter;