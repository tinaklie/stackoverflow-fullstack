import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./pages/routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./gql/client";

const router = createBrowserRouter(routes);

export function App() {
  loadDevMessages();
  loadErrorMessages();

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
