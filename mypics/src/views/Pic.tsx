import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { styled, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import theme from "./Landing/theme";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import red from "@mui/material/colors/red";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import MainAppBar from "./MainAppBar";

const MyPaper = styled(Paper)({
  borderRadius: 20,
  //borderColor: "#000",
  padding: 20,
});

export default function Pic() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <MainAppBar />
        <main>
          <Box sx={{ ml: 3, mt: 15 }}>
            <IconButton aria-label="back">
              <ArrowBackIcon sx={{ color: "28282a" }} />
            </IconButton>
          </Box>
          <Container
            sx={{
              display: "flex",
              justifyContent: "Space-between",
              width: 1600,
              //height: 900,
            }}
          >
            <MyPaper sx={{ m: 2 }} elevation={15}>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <Card
                    elevation={0}
                    sx={{
                      //height: "100%",
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
                      image="https://source.unsplash.com/random"
                      alt="random"
                      //height="250"
                      //sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Container
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      ml: 2,
                      mt: 2,
                    }}
                  >
                    <Typography variant="h5" fontSize="20pt" fontWeight="500">
                      Title
                    </Typography>
                    <Box>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="save image">
                        <BookmarkBorderIcon />
                      </IconButton>
                    </Box>
                  </Container>
                  <Container sx={{ mt: 3, ml: 2 }}>
                    <Typography align="justify">
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </Container>
                  <Container
                    sx={{ display: "flex", alignItems: "center", mt: 3, ml: 2 }}
                  >
                    <AccountCircle
                      sx={{
                        color: "action.active",
                        mr: 1,
                        fontSize: 40,
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Leave a comment"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Container>
                  <Container
                    sx={{ display: "flex", alignItems: "center", mt: 3, ml: 2 }}
                  >
                    <Typography variant="h5" fontSize="16pt" fontWeight="500">
                      Comments:
                    </Typography>
                  </Container>
                </Grid>
              </Grid>
            </MyPaper>
          </Container>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}