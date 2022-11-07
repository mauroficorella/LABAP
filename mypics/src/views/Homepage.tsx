import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import MainAppBar from "./MainAppBar";
import React from "react";
import theme from "./Landing/theme";
import ImageList from "./ImageList";


export default function Homepage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <MainAppBar />
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 7,
              pb: 3,
            }}
          ></Box>
          <Box sx={{ mr: 3, ml: 3 }}>
            <ImageList />
          </Box>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
