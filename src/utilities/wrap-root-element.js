import React from "react";
import { ThemeProvider } from "theme-ui";
import { dark } from "@theme-ui/presets";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo/client";

const newdark = {
  ...dark,
  sizes: { container: "100%" },
};

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={newdark}>{element}</ThemeProvider>
  </ApolloProvider>
);
