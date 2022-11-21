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
import React, { useState, useEffect } from "react";
import TitlebarBelowImageList from "./StandardImageList";
import axios from "axios";

export default function Homepage() {
  const [imageListType, setImageListType] = useState("profile");
  const [followageInfo, setFollowageInfo] = useState<{ [key: string]: any }>(
    {}
  );
  const [numFollowers, setNumFollowers] = useState("");
  const [numFollowing, setNumFollowing] = useState("");
  const [currentUserData, setCurrentUserData] = useState({
    username: "Valentina",
    profile_pic:
      "https://64.media.tumblr.com/e00dfbcb28061317d0907c98a7adcfd8/808526bb8fef50e1-2b/s400x600/59f45ee753c7b197f517151c142501b0da5b8ce8.jpg",
  }); //TODO

  const showSavedImageList = () => {
    setImageListType("saved");
  };

  const showProfileImageList = () => {
    setImageListType("profile");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/followageinfo/abcdef95")
      .then((response) => {
        setFollowageInfo(response.data[0]);
        setNumFollowers(
          (response.data[0]["num_followers"] = 1
            ? response.data[0]["num_followers"] + "  Follower"
            : response.data[0]["num_followers"] + "  Followers")
        );
        setNumFollowing(response.data[0]["num_following"] + "  Following");
      });
    //TODO AGGIUNGERE LE GET PER L'USERNAME E L'IMMAGINE DEL PROFILO, PER IL MOMENTO SONO DEFINITI SOPRA E NON VENGONO PRESI DALLE API
  }, []);


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
              src={currentUserData.profile_pic} //TODO Mettere immagine qui
              sx={{ width: 128, height: 128 }}
            />
          </Box>{" "}
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 2, mt: { sx: 1, sm: 2 } }}
          >
            {currentUserData.username}
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
              <Typography color="inherit">{numFollowers}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography color="inherit">{numFollowing}</Typography>
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
