import { Outlet, RouteObject } from "react-router-dom";
import { Question } from "./Question";
import { Main } from "./Main";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet></Outlet>,
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
