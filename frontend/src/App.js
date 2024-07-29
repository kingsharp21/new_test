import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Feed from './pages/feed/Feed';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';

import ProtectedRoute from './ProtectedRoute';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoute><Feed /></ProtectedRoute>,
  },
]);

function App() {
  return (

    <RouterProvider router={router} ></RouterProvider>

  );
}

export default App;
