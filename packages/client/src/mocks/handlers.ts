import { HttpResponse, graphql } from "msw";

// Mock Data
export const mockQuestions = [
  {
    __typename: "Question",
    _id: "657ab8be96872c88e7b1a1af",
    title: "Lorem Ipsum ?",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    votes: -2,
  },
  {
    __typename: "Question",
    _id: "657ab8e27b0db68c1645e1bf",
    title: "How to insert a question into MongoDB?",
    description: "I want to insert a Question into MongoDB - How to do it?",
    votes: 5,
  },
];
const backend = graphql.link("http://localhost:4000/graphql");

export const handlers = [
  backend.query("GetQuestionList", () => {
    return HttpResponse.json({
      data: {
        __typename: "Query",
        questions: mockQuestions,
      },
    });
  }),
];
