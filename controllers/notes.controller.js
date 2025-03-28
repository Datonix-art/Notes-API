import { v4 as uuidv4 } from 'uuid';
import createError from '../utils/createError.js';
import notesdb from '../databases/notes.db.js';

export const getAllNotes = (req, res, next) => {
    if(notesdb.length === 0) return next(createError(404, 'Notes not found'));
    res.status(200).json(notesdb);
}

export const getSingleNote = (req, res, next) => {
    const id = req.params.id;
    const note = notesdb.find((note) => note.id === id)
    if(!note) return next(createError(404, 'Note not found with such id'));
    res.status(200).json(note)
}

export const createNewNote =  (req, res, next) => {
    const { title, content } = req.body;
    if(!title || !content) return next(createError(400, 'Please include title and content' ))
    const newId = uuidv4()
    const isDuplicateId = notesdb.some((note) => note.id === newId);
    if(!isDuplicateId) {
        const newNote = {
            id: newId,
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date().toISOString() 
        } 
        try {
            notesdb.push(newNote);
            res.status(201).json(notesdb);
        } catch(e) {
            return next(createError(500, e.message))
        }
    }
}

export const updateSingleNote = (req, res, next) => {
    const id = req.params.id
    const { title, content } = req.body;
    let note = notesdb.find((note) => note.id == id);
    if(!note) return next(createError(404, 'No note found with such id'))
    try {
        note.title = title;
        note.content = content;
        res.status(200).json(notesdb)
    } catch (e) {
        return next(createError(500, e.message ))
    }
}

export const deleteSingleNote = (req, res, next) => {
    const id = req.params.id
    let note = notesdb.find((note) => note.id == id);
    if(!note) return next(new Error(404, 'No note found with such id'));
    try {
        notesdb.splice(notesdb.indexOf(note), 1);
        res.status(200).json(notesdb);
    } catch (e) {
        return next(new Error({ status: 500, message: e.message }))
    }
}