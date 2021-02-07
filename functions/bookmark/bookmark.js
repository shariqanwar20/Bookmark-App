require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    getBookmarks: [Bookmark!]
  }

  type Bookmark {
    id: ID!
    title: String!
    url: String!
    owner: String!
  }
`;

// const authors = [
//   { id: 1, name: "Terry Pratchett", married: false },
//   { id: 2, name: "Stephen King", married: true },
//   { id: 3, name: "JK Rowling", married: false },
// ];

const resolvers = {
  Query: {
    getBookmarks: async (_, _, { user }) => {
      if (process.env.FAUNADB_ADMIN_SECRET) {
        var client = new faunadb.Client({
          secret: process.env.FAUNADB_ADMIN_SECRET,
        });
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("todo_by_owner"), user)),
            q.Lambda((x) => q.Get(x))
          )
        );

        console.log(result);
        return result.data.map((bookmark) => {
          return {
            id: result.ref.id,
            title: result.data.title,
            url: result.data.url,
          };
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    } else {
      return {};
    }
  },
});

const handler = server.createHandler();

module.exports = { handler };
