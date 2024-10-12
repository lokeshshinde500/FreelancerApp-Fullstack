import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import CreateProjectForm from "../components/CreateProjectForm";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,

    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/home",
    element: (
      <PrivateRoutes>
        <Navbar />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "addProject",
        element: <CreateProjectForm />,
      },
    ],
  },
]);

export default function AllRoutes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
