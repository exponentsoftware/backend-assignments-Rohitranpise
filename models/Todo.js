const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    done: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
    hobby: {
        type: String,
        required: true
    }
})

const Todo = mongoose.model('todo', todoSchema)
module.exports = Todo;