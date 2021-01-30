import React from "react";
import { ThemeProvider } from "theme-ui";
import { dark } from "@theme-ui/presets";

const newdark = {
  ...dark,
  sizes: { container: "100%" },
};

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={newdark}>{element}</ThemeProvider>
);
