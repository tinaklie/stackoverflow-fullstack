import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { connectToDb } from "./db/db_context";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  connectToDb();
  const yoga = createYoga({});
  const server = createServer(yoga);
  server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/graphql");
  });
}

main();
