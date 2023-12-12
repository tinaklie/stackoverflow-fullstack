import { DbContext, connectToDb } from "./db/db_context";

export type GqlContext = {
  db: DbContext;
};

export const createContext = async (): Promise<GqlContext> => {
  const db = await connectToDb();
  return {
    db,
  };
};
