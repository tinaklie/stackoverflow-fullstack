import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { server } from "../src/mocks/server";
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(() => {
  console.log("beforeAll: server.listen");
  server.listen({ onUnhandledRequest: "error" });
});
afterAll(() => {
  console.log("afterAll: server.close");
  server.close();
});
afterEach(() => {
  console.log("afterEach: server.resetHandlers");
  server.resetHandlers();
  cleanup();
});
