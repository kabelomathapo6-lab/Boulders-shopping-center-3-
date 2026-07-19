import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, NotFoundPage } from "./shared.jsx";
import { DirectoryPage, VisitPage, WhatsOnPage } from "./pages.jsx";
import { HomePage } from "./HomePage.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/directory", element: <DirectoryPage /> },
      { path: "/whats-on", element: <WhatsOnPage /> },
      { path: "/visit", element: <VisitPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
