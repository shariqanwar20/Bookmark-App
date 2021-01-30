import React from "react";
import { ThemeProvider } from "theme-ui";
import { deep } from "@theme-ui/presets";

const newDeep = {
  ...deep,
  sizes: { container: "100%" },
};

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={newDeep}>{element}</ThemeProvider>
);
