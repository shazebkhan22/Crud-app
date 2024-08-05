// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../features/todoSlice';
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
  Heading,
  HStack,
} from '@chakra-ui/react';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const loading = useSelector((state) => state.todos.loading);
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (title) {
      dispatch(addTodo({ title }));
      setTitle('');
    }
  };

  const handleToggleComplete = (todo) => {
    dispatch(updateTodo({ id: todo._id, completed: !todo.completed }));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box maxW="500px" mx="auto" p={5}>
      <Heading mb={6} textAlign="center">
        Todo List
      </Heading>
      <HStack mb={4}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          size="md"
        />
        <Button onClick={handleAddTodo} colorScheme="teal">
          Add
        </Button>
      </HStack>
      <List spacing={3}>
        {todos.map((todo) => (
          <ListItem
            key={todo._id}
            p={3}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            _hover={{ bg: 'gray.100' }}
          >
            <HStack justifyContent="space-between">
              <Text
                as={todo.completed ? 's' : undefined}
                cursor="pointer"
                onClick={() => handleToggleComplete(todo)}
              >
                {todo.title}
              </Text>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
