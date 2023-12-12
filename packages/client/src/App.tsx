import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./pages/routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./gql/client";

const router = createBrowserRouter(routes);

export function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
