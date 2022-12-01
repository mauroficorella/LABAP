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
import SimpleDialog from "./SimpleDialog";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

export default function Homepage() {
  const { user } = useAuth();

  const [imageListType, setImageListType] = useState("profile");
  const [followageInfo, setFollowageInfo] = useState<{ [key: string]: any }>(
    {}
  );
  const [numFollowers, setNumFollowers] = useState("");
  const [numFollowing, setNumFollowing] = useState("");

  const showSavedImageList = () => {
    setImageListType("saved");
  };

  const showProfileImageList = () => {
    setImageListType("profile");
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [selectedTitle, setSelectedTitle] = React.useState("");

  const handleClickOpenFollowers = () => {
    setOpen(true);
    setSelectedValue(followageInfo.followers);
    setSelectedTitle("People following you:");
    console.log(followageInfo.followers);
  };

  const handleClickOpenFollowing = () => {
    setOpen(true);
    setSelectedValue(followageInfo.following);
    setSelectedTitle("People you follow:");
    console.log(followageInfo.following);
  };

  const handleClose = (value: any[]) => {
    setOpen(false);
    //setSelectedValue(value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/followageinfo/" + user.user_id)
      .then((response) => {
        console.log("_________RESPONSE____________");
        console.log(response.data[0]);
        setFollowageInfo(response.data[0]);
        setNumFollowers(
          response.data[0]["num_followers"] == 1
            ? response.data[0]["num_followers"] + "  Follower"
            : response.data[0]["num_followers"] + "  Followers"
        );
        setNumFollowing(response.data[0]["num_following"] + "  Following");
      });
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
              src={user.profile_pic}
              sx={{ width: 128, height: 128 }}
            />
          </Box>{" "}
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 2, mt: { sx: 1, sm: 2 } }}
          >
            {user.username}
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
              <Button color="inherit" onClick={handleClickOpenFollowers}>
                {numFollowers}
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button color="inherit" onClick={handleClickOpenFollowing}>
                {numFollowing}
              </Button>
            </Box>
          </Container>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              mt: 5,
              mb: 5,
            }}
          >
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
            <ImageList
              list_type={imageListType}
            ></ImageList>
          </Box>
          <Box>
            <br />
            <SimpleDialog
              title={selectedTitle}
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
          </Box>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
