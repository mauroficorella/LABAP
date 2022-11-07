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
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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
          <Box sx={{ bgcolor: "background.paper", pt: 5, pb: 2 }}></Box>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "Space-between",
              width: 1 / 4,
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.primary"
              fontSize="15pt"
            >
              Change profile image
            </Typography>
            <IconButton aria-label="delete">
              <CloudUploadIcon />
            </IconButton>
          </Container>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "Space-between",
              width: 1 / 4,
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.primary"
              fontSize="15pt"
            >
              Change username
            </Typography>
            <IconButton aria-label="delete">
              <BorderColorIcon />
            </IconButton>
          </Container>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "Space-between",
              width: 1 / 4,
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.primary"
              fontSize="15pt"
            >
              Change email
            </Typography>
            <IconButton aria-label="delete">
              <BorderColorIcon />
            </IconButton>
          </Container>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "Space-between",
              width: 1 / 4,
            }}
          >
            <Typography component="h1" align="left" color="text.primary" fontSize = "15pt">
              Change password
            </Typography>
            <IconButton aria-label="delete">
              <BorderColorIcon />
            </IconButton>
          </Container>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
