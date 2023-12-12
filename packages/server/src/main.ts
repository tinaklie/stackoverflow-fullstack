import { renderGraphiQL } from "@graphql-yoga/render-graphiql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import * as dotenv from "dotenv";
import { GqlContext, createContext } from "./create-context";
import { typeDefinitions } from "./schema";
import { resolvers } from "./resolver";

dotenv.config();

async function main() {
  const schema = createSchema<GqlContext>({
    typeDefs: typeDefinitions,
    resolvers,
  });
  const context = await createContext();
  const yoga = createYoga({ schema, context, renderGraphiQL });
  const server = createServer(yoga);
  server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/graphql");
  });
}

main();
