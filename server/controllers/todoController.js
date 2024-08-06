const Todo = require('../models/Todo');

// GET all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error: error.message });
    }
};

// POST a new todo
const addTodo = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const newTodo = await Todo.create({ title });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: 'Error creating todo', error: error.message });
    }
};

// PUT (update) a todo by ID
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, completed },
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: 'Error updating todo', error: error.message });
    }
};

// DELETE a todo by ID
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully', todo });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error: error.message });
    }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };