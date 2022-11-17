import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import React, {useState} from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import theme from "../Landing/theme";
import MainAppBar from "../MainAppBar";
import MasornyImageList from "./MasornyImageList";

export default function Homepage() {

  const [imageListType, setImageListType] = useState("popular");

  const showPopularImageList = () => {
    console.log("Executing showSavedImageList")
    setImageListType("popular")
  }

  const showFollowedImageList = () => {
    console.log("Executing showProfileImageList")
    setImageListType("followed")
  }


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
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", mt: 3, mb: 4 }}>
            <ButtonGroup
              variant="contained"
              color="secondary"
              aria-label="medium secondary button group"
              size="large"
            >
              <Button onClick={showPopularImageList}>Popular</Button>
              <Button onClick={showFollowedImageList}>Following</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ mr: 3, ml: 3 }}>
            <MasornyImageList list_type={imageListType}></MasornyImageList>
          </Box>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
