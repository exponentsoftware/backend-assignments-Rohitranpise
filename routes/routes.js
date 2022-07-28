const express = require('express')
const mongoose = require('mongoose')
require('../models/Todo')
const router = express.Router()
const Todo = mongoose.model('todo')

//create a new todo
router.post("/", (req, res) => {
    const { username, title, done, hobby } = req.body;
    if (!username || !title || !done || !hobby) {
        res.status(422).json({ Error: "please add all required field" })
    }
    const todo = new Todo({
        username,
        title,
        done,
        hobby
    })
    todo.save()
        .then(todo => {
            res.json({ message: "saved successfully!" })
        })
        .catch(err => {
            console.log(err)
        })
});

//get all todos
router.get("/data", async (req, res) => {
    try {
        const list = await Todo.find()
        res.json(list);
    } catch (err) {
        res.send('Error' + err)
    }
})


//find one todo by id
router.get("/find/:id", async (req, res) => {
    try {
        const one = await Todo.findById(req.params.id)
        res.status(200).json(one)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete one todo by id
router.delete("/:id", async (req, res) => {
    try {
      await Todo.findOneAndDelete(req.params.id);
      res.status(200).json("Todo has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update one by id
router.put("/:id", async (req, res) => {
    let todoId = req.body.todoId
    let updateData = {
        username: req.body.username,
        title: req.body.title,
        done: req.body.done,
        hobby: req.body.hobby
    }

    Todo.findByIdAndUpdate(todoId, { $set: updateData })
        .then(() => {
            res.json({
                message: 'updated success'
            })
        }).catch(error => {
            res.json({
                message: 'error'
            })
        })
})

module.exports = router;