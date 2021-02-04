const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

//the error was here
const typeDefs = gql`
  type Query {
    todoList: [Todo!]
  }
  type Mutation {
    addTodo(task: String!): Todo
    updateTodo(id: ID!, task: String!): Todo
    deleteTodo(id: ID!): Todo
    updateTodoCheckbox(id: ID!): Todo
  }
  type Todo {
    id: ID!
    task: String!
    status: Boolean!
    owner: String!
  }
`;

const resolvers = {
  Query: {
    todoList: async (parent, args, { user }) => {
      try {
        if (!user) return [];
        else {
          if (process.env.FAUNADB_ADMIN_SECRET) {
            var client = new faunadb.Client({
              secret: process.env.FAUNADB_ADMIN_SECRET,
            });
            const result = await client.query(
              q.Map(
                q.Paginate(q.Match(q.Index("todo_by_user"), user)),
                q.Lambda((x) => q.Get(x))
              )
            );
            return result.data.map((todo) => {
              // console.log(todo.ref.id);
              return {
                id: todo.ref.id,
                task: todo.data.task,
                status: todo.data.status,
              };
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    updateTodo: async (_, { id, task }) => {
      console.log("id: ", id);
      console.log("task: ", task);

      try {
        var client = new faunadb.Client({
          secret: process.env.FAUNADB_ADMIN_SECRET,
        });
        const result = await client.query(
          q.Update(q.Ref(q.Collection("todo"), id), {
            data: {
              task: task,
            },
          })
        );

        console.log(result);
        return result.task;
      } catch (error) {
        console.log(error);
      }
    },

    addTodo: async (_, { task }, { user }) => {
      console.log(task);
      if (!user) {
        throw new Error("Must be authenticated to insert todos");
      }
      try {
        var client = new faunadb.Client({
          secret: process.env.FAUNADB_ADMIN_SECRET,
        });

        const result = await client.query(
          q.Create(q.Collection("todo"), {
            data: {
              task: task,
              status: false,
              owner: user,
            },
          })
        );

        console.log(result);
        return result.task;
      } catch (err) {
        console.log(err);
      }
    },
    deleteTodo: async (_, { id }) => {
      console.log("id: ", id);

      try {
        var client = new faunadb.Client({
          secret: process.env.FAUNADB_ADMIN_SECRET,
        });
        const result = await client.query(
          q.Delete(q.Ref(q.Collection("todo"), id))
        );

        console.log(result);
        return result.task;
      } catch (error) {
        console.log(error);
      }
    },
    updateTodoCheckbox: async (_, { id }) => {
      console.log("id: ", id);

      try {
        var client = new faunadb.Client({
          secret: process.env.FAUNADB_ADMIN_SECRET,
        });
        const checkboxCurrentValue = await client.query(
          q.Get(q.Ref(q.Collection("todo"), id))
        );
        console.log(checkboxCurrentValue);
        const result = await client.query(
          q.Update(q.Ref(q.Collection("todo"), id), {
            data: {
              status: !checkboxCurrentValue.data.status,
            },
          })
        );

        console.log(result);
        return result.status;
      } catch (error) {
        console.log(error);
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
