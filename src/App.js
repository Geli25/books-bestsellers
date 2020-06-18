import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./theme/theme";

import BestSellers from "./Components/BestSellers";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BestSellers />
    </ThemeProvider>
  );
}

export default App;
