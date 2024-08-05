const Todo = require('../models/Todo');

// GET all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new todo
const addTodo = async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT (update) a todo by ID
const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        
        // Update fields
        todo.completed = req.body.completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a todo by ID
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        
        // Use deleteOne or findByIdAndDelete
        await Todo.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
