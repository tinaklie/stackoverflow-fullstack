import { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";

const config: CodegenConfig = {
  schema: "./packages/server/src/schema.ts",
  documents: ["./packages/server/src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./packages/server/src/generated.types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./create-context#GqlContext",
        mappers: {
          Question: "./db/types#QuestionDB",
        },
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
    "./packages/client/src/gql/": {
      preset: "client",
      documentTransforms: [addTypenameSelectionDocumentTransform],
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
