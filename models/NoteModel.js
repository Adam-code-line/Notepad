// models/NoteModel.js
const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    content: String,
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('NoteModel', noteSchema);