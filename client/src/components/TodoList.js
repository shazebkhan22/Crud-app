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
  VStack,
  useToast,
} from '@chakra-ui/react';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const [title, setTitle] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleAddTodo = () => {
    if (title.trim()) {
      dispatch(addTodo(title.trim()))
        .unwrap()
        .then(() => {
          setTitle('');
          toast({
            title: 'Todo added',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: 'Failed to add todo',
            description: error.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };

  const handleToggleComplete = (todo) => {
    dispatch(updateTodo({ id: todo._id, completed: !todo.completed }))
      .unwrap()
      .catch((error) => {
        toast({
          title: 'Failed to update todo',
          description: error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
      .unwrap()
      .then(() => {
        toast({
          title: 'Todo deleted',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Failed to delete todo',
          description: error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  if (status === 'loading') {
    return <Spinner size="xl" />;
  }

  if (status === 'failed') {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box maxW="500px" mx="auto" p={5}>
      <Heading mb={6} textAlign="center">
        Todo List
      </Heading>
      <VStack spacing={4} align="stretch">
        <HStack>
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
      </VStack>
    </Box>
  );
};

export default TodoList;