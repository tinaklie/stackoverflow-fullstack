import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";

const config: CodegenConfig = {
  schema: "./packages/server/src/schema.ts",
  ignoreNoDocuments: true,
  documents: ["./packages/client/src/**/*.tsx"],
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
      presetConfig: {
        fragmentMasking: true,
      },
      documentTransforms: [addTypenameSelectionDocumentTransform],
    },
    "./packages/client/src/gql/fragement.ts": {
      plugins: ["fragment-matcher"],
      config: {
        module: "es2015",
      },
    },
  },
  hooks: { afterOneFileWrite: ["prettier --write"] },
};

export default config;
