import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import ImageList from "./ImageList";
import MainAppBar from "./MainAppBar";
import theme from "./Landing/theme";
import React from "react";


export default function Homepage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <MainAppBar />
        <main>
          <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 8 }}></Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg" //TODO Mettere immagine qui
              sx={{ width: 128, height: 128 }}
            />
          </Box>{" "}
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 2, mt: { sx: 1, sm: 2 } }}
          >
            Username
          </Typography>
          <Container
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              width: 1 / 4,
            }}
          >
            <Box
              sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Typography color="inherit">N. Followers</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography color="inherit">N. Following</Typography>
            </Box>
          </Container>
          <Box sx={{ bgcolor: "background.paper", pt: 2, pb: 2 }}></Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <ButtonGroup
              variant="contained"
              color="error" //TODO scegliere il colore
              aria-label="medium secondary button group"
            >
              <Button>Your Pics</Button>
              <Button>Saved</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ bgcolor: "background.paper", pt: 2, pb: 2 }}></Box>
          <Box sx={{ m: 5 }}><ImageList /></Box>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
