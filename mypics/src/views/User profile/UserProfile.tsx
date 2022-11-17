import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import ImageList from "./StandardImageList";
import MainAppBar from "../MainAppBar";
import theme from "../Landing/theme";
import React, { useState } from "react";
import TitlebarBelowImageList from "./StandardImageList";

export default function Homepage() {
  const [imageListType, setImageListType] = useState("profile");

  const showSavedImageList = () => {
    console.log("Executing showSavedImageList");
    setImageListType("saved");
  };

  const showProfileImageList = () => {
    console.log("Executing showProfileImageList");
    setImageListType("profile");
  };

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
              width: 1 / 5,
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
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", mt: 5, mb: 5 }}>
            <ButtonGroup
              variant="contained"
              color="secondary"
              aria-label="medium secondary button group"
              size="large"
            >
              <Button onClick={showProfileImageList}>Your Pics</Button>
              <Button onClick={showSavedImageList}>Saved</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ mr: 3, ml: 3 }}>
            <ImageList list_type={imageListType}></ImageList>
          </Box>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
