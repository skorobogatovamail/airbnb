import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import { useAppDispatch } from './redux/hooks';
import { refreshThunk } from './redux/slices/authFirebase/authFirebaseThunks';
import { getAllEntriesThunk } from './redux/slices/entriesFirebase/entriesFirebaseThunks';
import CardPage from './components/pages/CardPage';
import CardFormPage from './components/pages/CardFormPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshThunk());
    void dispatch(getAllEntriesThunk());
  }, []);

  const routes = [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <MainPage /> },
        { path: '/signup', element: <SignupPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/hotels/:id', element: <CardPage /> },
        { path: '/hotels/new', element: <CardFormPage /> },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
