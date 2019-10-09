const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema({
    todoDescription: { type: String, required: true },
    todoDateCreated: { type: Date, default: Date.now, required: true },
    todoCompleted: { type: Boolean }
});

module.exports = mongoose.model(`Todo`, Todo);