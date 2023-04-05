const express = require('express');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Router = express.Router();
const Note = require('../models/Note');
//Route 1:fetch all notes 
Router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})
//Route 2:add a note
Router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //if there are errors,return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured")
        }

    })

//Route 3 :update an existing note
Router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //creating a new note
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        //validating the note if it exists or not
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("not found");
        if (note.user.toString() !== req.user.id) return res.status(401).send("Not allowed");
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

//Route 4:Delete an existing note
Router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //validating a note if it exists or not
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("not found");
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "success": "note has been deleted" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})
module.exports = Router;