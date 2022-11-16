import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import MainAppBar from "./MainAppBar";
import React, {useState} from "react";
import theme from "./Landing/theme";
import ImageList from "./ImageList";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

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
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
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
            <ImageList list_type={imageListType}></ImageList>
          </Box>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
