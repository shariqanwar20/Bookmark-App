import fetch from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import netlifyIdentity from "netlify-identity-widget";
import { setContext } from "apollo-link-context";

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user.token.access_token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const httpLink = new HttpLink({
  uri: "/.netlify/functions/todoList",
  fetch,
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
