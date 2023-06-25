/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import Categories from './pages/Categories';
import Priorities from './pages/Priorities';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Signup />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/statistics',
        element: <Statistics />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/priorities',
        element: <Priorities />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
