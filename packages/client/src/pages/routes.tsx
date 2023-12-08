import { Outlet, RouteObject } from "react-router-dom";
import Question from "./Question";
import Main from "./Main";

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
        element: <Question></Question>,
      },
    ],
  },
];
