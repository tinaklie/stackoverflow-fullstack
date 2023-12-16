import { Outlet, RouteObject } from "react-router-dom";
import { Question } from "./Question";
import { QuestionList } from "./QuestionList";
import { MainLayout } from "../layout/MainLayout";
import { CreateQuestionPage } from "../question-create/CreateQuestionPage";
import { ErrorPage } from "./ErrorPage";
import { NotFound } from "./NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <QuestionList></QuestionList>,
      },
      {
        path: "question",
        children: [
          { path: "ask", element: <CreateQuestionPage /> },
          { path: ":id", element: <Question /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];
