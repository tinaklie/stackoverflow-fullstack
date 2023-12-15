import { describe, expect, test } from "vitest";
import { Main } from "../../src/pages/Main";
import { render, screen } from "../utils/test-utils";
import React from "react";

describe("QuestionListPage", () => {
  test("page rendered", async () => {
    render(<Main />);
    const item = await screen.findByText("Ask Question");
    expect(item).toBeInTheDocument();
  });
  test("get question title", async () => {
    render(<Main />);
    const item = await screen.findByText("Lorem Ipsum ?");
    expect(item).toBeInTheDocument();
  });
});
