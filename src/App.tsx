import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import ProtectedLayout from "./layout/layout";
import Books from "./pages/books";
import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import SimpleLayout from "./layout/simple-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SimpleLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/app",
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <Books />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
