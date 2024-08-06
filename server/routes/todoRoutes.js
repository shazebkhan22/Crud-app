const express = require('express');
const router = express.Router();
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// GET all todos
router.get('/', getTodos);

// POST a new todo
router.post('/', addTodo);

// PUT (update) a todo by ID
router.put('/:id', updateTodo);

// DELETE a todo by ID
router.delete('/:id', deleteTodo);

module.exports = router;