import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';

function App(): JSX.Element {
  const routes = [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <MainPage /> },
        { path: '/signup', element: <SignupPage /> },
        { path: '/login', element: <LoginPage /> },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
