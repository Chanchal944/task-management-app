import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import { MainLayout } from "./MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { TaskPage } from "./pages/TaskPage";
import { FilteringPage } from "./pages/FilteringPage";
import { DashboardPage } from "./pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "task",
        element: createElement(
          ProtectedRoute,
          null,
          createElement(TaskPage),
        ),
      },
      {
        path: "filtering",
        Component: FilteringPage,
      },
      {
        path: "dashboard",
        element: createElement(
          ProtectedRoute,
          null,
          createElement(DashboardPage),
        ),
      },
    ],
  },
]);
