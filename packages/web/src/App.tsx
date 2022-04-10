import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createApolloClient } from './apollo/createApolloClient';
import Film from './pages/Film';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const apolloClient = createApolloClient();

export const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/film/:filmId" element={<Film />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
};
