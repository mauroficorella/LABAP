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
import React, { useEffect, useState } from "react";
import MainAppBar from "./MainAppBar";
import { useLocation } from "react-router";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const MyPaper = styled(Paper)({
  borderRadius: 20,
  //borderColor: "#000",
  padding: 20,
});

function formatDate(date: any) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleTimeString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parseDate(dateData: any) {
  const day = dateData["_DateTime__date"]["_Date__day"];
  const month = dateData["_DateTime__date"]["_Date__month"];
  const year = dateData["_DateTime__date"]["_Date__year"];
  const hour = dateData["_DateTime__time"]["_Time__hour"];
  const minute = dateData["_DateTime__time"]["_Time__minute"];
  const second = dateData["_DateTime__time"]["_Time__second"];

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month_index = parseInt(month, 10) - 1;
  var date_string =
    day + " " + months[month_index] + " " + year + ", " + hour + ":" + minute;
  return date_string;
}

export default function Pic() {
  const { state } = useLocation(); //state contiene i dati riguardanti l'immagine che è stata cliccata dalla pagina precedente
  console.log("🚀 ~ file: Pic.tsx ~ line 34 ~ Pic ~ state", state);

  const [itemData, setItemData] = useState<{ [key: string]: any }>({});
  const [isLoading, setLoading] = useState(true);
  const [liked, setLiked] = useState(state.liked);

  const addOrRemoveLike = () => {
    liked ? setLiked(false) : setLiked(true);
    //TODO TRIGGERARE L'API PER AGGIORNARE IL DB
  };

  /*const StyledFavoriteIcon = styled(FavoriteIcon, {
    name: "StyledFavoriteIcon",
  })({
    color: state.published ? "red" : "grey",
    //"&:hover": { color: "blue" },
  });*/

  useEffect(() => {
    axios
      .get("http://localhost:8000/postinfo/" + state.post_id + "/abcdef95")
      .then((response) => {
        setItemData(response.data[0]);
        console.log(response.data[0]);
        console.log(response.data[0].datetime);
        console.log("COMMENTS");
        console.log(response.data[0].comments);
        console.log("-------------------STATE-----------------");
        console.log(state);
        setLoading(false); //stop loading when data is fetched
      });
  }, [state]);

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
                        <Avatar
                          sx={{ bgcolor: red[500], width: 72, height: 72 }}
                          aria-label="recipe"
                          src={state.profile_pic}
                        ></Avatar>
                      }
                      title={state.username}
                      subheader={parseDate(state.datetime)}
                    />
                    <CardMedia
                      component="img"
                      image={state.fb_img_url}
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
                      {state.title}
                    </Typography>
                    <Box>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={addOrRemoveLike}
                      >
                        {liked ? (
                          <FavoriteIcon color="secondary" />
                        ) : (
                          <FavoriteBorderIcon></FavoriteBorderIcon>
                        )}
                      </IconButton>
                      <IconButton aria-label="save image">
                        <BookmarkBorderIcon />
                      </IconButton>
                    </Box>
                  </Container>
                  <Container sx={{ mt: 3, ml: 2 }}>
                    <Typography align="justify">{state.description}</Typography>
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
                  <Container
                    sx={{ display: "flex", alignItems: "center", mt: 3, ml: 2 }}
                  >
                    {isLoading ? (
                      <div
                        style={{
                          width: "100%",
                          height: "100",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ThreeDots color="#ff3366" height="100" width="100" />
                      </div>
                    ) : (
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: "100%",
                          bgcolor: "background.paper",
                        }}
                      >
                        {itemData.comments ? ( //TODO: non funziona questo check perché quando i commenti non ci sono "comments" non c'è proprio nei dati ritrnati dal backend, capire come fare questo check
                          itemData.comments.map(
                            (comment: {
                              comment_id: string;
                              comment_text: string;
                              datetime: any[];
                              user_id: string;
                              username: string;
                              profile_pic: string;
                              published_comment: boolean;
                            }) => (
                              <ListItem
                                key={comment.comment_id}
                                disableGutters
                                sx={{
                                  width: "100%",
                                  backgroundColor: "#fcf2f5",
                                  borderRadius: 4,
                                  padding: 1.5,
                                  mb: 1,
                                }}
                                alignItems="flex-start"
                              >
                                <ListItemAvatar>
                                  <Avatar src={comment.profile_pic}></Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={comment.username}
                                  secondary={
                                    <React.Fragment>
                                      <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        {comment.comment_text}
                                      </Typography>
                                      <Typography
                                        sx={{ display: "inline" }}
                                        component={"span"}
                                      >
                                        {parseDate(comment.datetime)}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                  sx={{
                                    width: "100",
                                  }}
                                />
                                <ListItemIcon>
                                  {comment.published_comment ? (
                                    <IconButton aria-label="comment">
                                      <DeleteIcon />
                                    </IconButton>
                                  ) : (
                                    <div></div>
                                  )}
                                </ListItemIcon>
                              </ListItem>
                            )
                          )
                        ) : (
                          <Typography> No comments to show</Typography>
                        )}
                      </List>
                    )}
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
