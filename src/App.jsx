import Root from "./Root/Root";
import LoginPage from "./pages/Login/LoginPage";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import Users from "./pages/Users/Users";
import Profile from "./pages/Profile/Profile";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PasswordUpdate from "./components/PasswordUpdate";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'tasks',
            element: <Tasks />
          },
          {
            path: 'users',
            element: <Users />
          },
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                path: 'passwordupdate',
                element: <PasswordUpdate />
              }
            ]
          }
        ]
      },
      {
        path: 'login',
        element: <LoginPage />
      }
    ]
  }
]);
function App() {
  return (
    <RouterProvider router={routes} />
  )
}

export default App
