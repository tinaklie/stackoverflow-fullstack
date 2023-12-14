import { Outlet, RouteObject } from "react-router-dom";
import { Question } from "./Question";
import { Main } from "./Main";
import { MainLayout } from "../layout/MainLayout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <Main></Main>,
      },
      {
        path: "question",
        children: [{ path: ":id", element: <Question></Question> }],
      },
    ],
  },
];
