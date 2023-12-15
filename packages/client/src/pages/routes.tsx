import { Outlet, RouteObject } from "react-router-dom";
import { Question } from "./Question";
import { QuestionList } from "./QuestionList";
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
        element: <QuestionList></QuestionList>,
      },
      {
        path: "question",
        children: [{ path: ":id", element: <Question></Question> }],
      },
    ],
  },
];
