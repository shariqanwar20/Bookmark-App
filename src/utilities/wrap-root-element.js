import React from "react";
import { ThemeProvider } from "theme-ui";
import { dark } from "@theme-ui/presets";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo/client";
import { IdentityProvider } from "./identity-context";

const newdark = {
  ...dark,
  sizes: { container: "100%" },
};

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <IdentityProvider>
      <ThemeProvider theme={newdark}>{element}</ThemeProvider>
    </IdentityProvider>
  </ApolloProvider>
);
