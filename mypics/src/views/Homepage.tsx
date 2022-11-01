import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MainAppBar from "./MainAppBar";
import React from "react";
import theme from "./Landing/theme";
import ImageList from "./ImageList";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


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
              pt: 3,
              pb: 3,
            }}
          ></Box>
          <Box sx={{ m: 5 }}>
            <ImageList />
          </Box>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
