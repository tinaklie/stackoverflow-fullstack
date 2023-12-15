import { describe, expect, test } from "vitest";
import { QuestionList } from "../../src/pages/QuestionList";
import { render, screen } from "../utils/test-utils";

describe("QuestionListPage", () => {
  test("page rendered", async () => {
    render(<QuestionList />);
    const item = await screen.findByText("Ask Question");
    expect(item).toBeInTheDocument();
  });
  test("get question title", async () => {
    render(<QuestionList />);
    const item = await screen.findByText("Lorem Ipsum ?");
    expect(item).toBeInTheDocument();
  });
});
