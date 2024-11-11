
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import Contacts from './components/Contacts';
import About from './components/About';
import Home from './components/Home';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
    
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/contacts",
      element: <Contacts/>
    },
    {
      path: "/about",
      element: <About/>
    },
    ]
    }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
