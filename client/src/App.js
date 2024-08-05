import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ChakraProvider, Container, Box, Heading } from '@chakra-ui/react';
import TodoList from './components/TodoList';

const App = () => {
    return (
        <ChakraProvider>
            <Provider store={store}>
                <Container maxW="container.md" centerContent marginTop="100">
                    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                        <Heading as="h1" size="xl" mb={4}>
                            Hello There!! 👋🏻
                        </Heading>
                        <TodoList />
                    </Box>
                </Container>
            </Provider>
        </ChakraProvider>
    );
};

export default App;
