import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { styled, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MainAppBar from "./MainAppBar";
import theme from "./Landing/theme";
import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
//import { DropzoneArea } from "material-ui-dropzone";

const MyPaper = styled(Paper)({
  borderRadius: 20,
  //borderColor: "#000",
  padding: 20,
});

export default function Homepage() {
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
                  <Typography>
                    INSERIRE DROPZONE QUI
                    ...............................................................................................................
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Container
                    sx={{
                      display: "flex",
                      ml: 2,
                      flexDirection: "column",
                      alignItems: "end",
                    }}
                  >
                    <Box
                      //sx={{ ml: 2 }}
                      component="form"
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        fullWidth
                        label="Add a title"
                        id="title"
                        variant="standard"
                        inputProps={{ style: { fontSize: 40 } }}
                        InputLabelProps={{ style: { fontSize: 40 } }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "99%",
                        maxWidth: "100%",
                        mt: 3,
                        ml: 2,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Add a description"
                        id="description"
                        multiline
                        rows={8}
                      />
                    </Box>
                    <Box sx={{ mt: 3, ml: 2 }}>
                      <Button
                        color="secondary"
                        variant="contained"
                        size="large"
                        component="a"
                        //href="//"
                        sx={{ minWidth: 200 }}
                      >
                        Save
                      </Button>
                    </Box>
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
/*
<DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => console.log("Files:", files)}
            />*/
