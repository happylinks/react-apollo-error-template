import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const commentsData = {
  list1: [
    { id: 1, value: 'List 1 Comment 1' },
    { id: 2, value: 'List 1 Comment 2' },
    { id: 3, value: 'List 1 Comment 3' },
  ],
  list2: [
    { id: 1, value: 'List 2 Comment 1' },
    { id: 2, value: 'List 2 Comment 2' },
    { id: 3, value: 'List 2 Comment 3' },
  ],
};

const typeDefs = `
  type Comment {
    id: String
    value: String
  }

  type Query {
    comments(id: String!): [Comment]
  }
  type Mutation {
    addComment(listID: String!, value: String!): Comment
  }
`;

const mocks = {
  Query: () => ({
    comments: (_root, { id }) => {
      return commentsData[id];
    },
  }),
  Mutation: () => ({
    addComment: (_root, { listID, value }) => {
      const newComment = {
        id: commentsData[listID][commentsData[listID].length - 1].id + 1,
        value,
      };
      commentsData[listID].push(newComment);

      return newComment;
    },
  }),
};

const schema = makeExecutableSchema({
  typeDefs,
});
addMockFunctionsToSchema({
  schema,
  mocks,
});

export default schema;
