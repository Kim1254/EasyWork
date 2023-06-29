import { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ResumePage from "./pages/ResumePage";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "/error", element: <ErrorPage /> },
      { path: "/resume", element: <ResumePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
