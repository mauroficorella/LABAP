import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MainAppBar from "./MainAppBar";
import theme from "./Landing/theme";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import red from "@mui/material/colors/red";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CardContent from "@mui/material/CardContent";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function Homepage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <MainAppBar />
        <main>
          <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 8 }}></Box>
          <Box sx={{ m: 1 }}>
            <IconButton aria-label="back">
              <ArrowBackIcon
                sx={{
                  color: "28282a",
                }}
              />
            </IconButton>
          </Box>
          <Container
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              width: 1 / 4,
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                title="Nome utente"
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  pt: "0%", //56.25%
                }}
                image="https://source.unsplash.com/random"
                alt="random"
              />
              <CardActions
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ m: 1 }}>
                  <Typography variant="h5">Title</Typography>
                </Box>
                <Box sx={{ justifyContent: "flex-end" }}>
                  <IconButton aria-label="comment">
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="save image">
                    <BookmarkBorderIcon />
                  </IconButton>
                </Box>
              </CardActions>
              <CardContent>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
              </CardContent>
            </Card>
          </Container>
          <Container
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              width: 1 / 4,
              my: 1,
            }}
          >
            <AccountCircle
              sx={{
                color: "action.active",
                mr: 1,
                //my: 0.5,
                fontSize: 30,
              }}
            />
            <TextField
              id="input-with-sx"
              label="Leave a comment"
              variant="standard"
              fullWidth
            />
          </Container>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
