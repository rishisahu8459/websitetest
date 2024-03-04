// router.js
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import React from 'react';
import {Shop} from "./pages/shop.js";



const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/shop",
    element: <Shop />,
  }

  
]);

export { router };
