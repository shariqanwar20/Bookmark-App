import React from "react";
import { ThemeProvider } from "theme-ui";
import { swiss } from "@theme-ui/presets";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo/client";
import { IdentityProvider } from "./identity-context";

const newswiss = {
  ...swiss,
  sizes: { container: "100%" },
};

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <IdentityProvider>
      <ThemeProvider theme={newswiss}>{element}</ThemeProvider>
    </IdentityProvider>
  </ApolloProvider>
);
