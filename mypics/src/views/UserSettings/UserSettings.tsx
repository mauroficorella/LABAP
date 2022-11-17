import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MainAppBar from "../MainAppBar";
import theme from "../Landing/theme";
import React from "react";
import Badge from "@mui/material/Badge";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import SettingsForm from "./SettingsForm";


export default function UserSettings() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <MainAppBar />
        <main>
          <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 8 }}></Box>
          <SettingsForm>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                mb: 10,
              }}
            >
              <Badge
                badgeContent={<CreateIcon fontSize="small" />}
                color="secondary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 8,
                    height: 30,
                    minWidth: 30,
                  },
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg" //TODO Mettere immagine qui
                  sx={{ width: 128, height: 128 }}
                />
              </Badge>
            </Box>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={9}>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontSize="10pt"
                    sx={{ mb: 0.5 }}
                    color="#9e9e9e"
                  >
                    Name
                  </Typography>
                  <Typography variant="h5" fontSize="15pt" sx={{ mb: 0.5 }}>
                    Username
                  </Typography>
                  <Divider light sx={{ mb: 1.5 }} />
                </Container>
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  component="a"
                  //href="//"
                  sx={{ minWidth: 70, ml: 1 }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={9}>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontSize="10pt"
                    sx={{ mb: 0.5, mt: 1 }}
                    color="#9e9e9e"
                  >
                    Email
                  </Typography>
                  <Typography variant="h5" fontSize="15pt" sx={{ mb: 0.5 }}>
                    email@prova.it
                  </Typography>
                  <Divider light sx={{ mb: 1.5 }} />
                </Container>
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  component="a"
                  //href="//"
                  sx={{ minWidth: 70, ml: 1 }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={9}>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontSize="10pt"
                    sx={{ mb: 0.5, mt: 1 }}
                    color="#9e9e9e"
                  >
                    Password
                  </Typography>
                  <Typography variant="h5" fontSize="15pt" sx={{ mb: 0.5 }}>
                    **********
                  </Typography>
                  <Divider light />
                </Container>
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  component="a"
                  //href="//"
                  sx={{ minWidth: 70, ml: 1 }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ pt: 4, pb: 4 }}></Box>
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                component="a"
                //href="//"
                sx={{ minWidth: 100 }}
              >
                Logout
              </Button>
              <Button
                color="secondary"
                variant="contained"
                component="a"
                //href="//"
                sx={{ minWidth: 180 }}
              >
                Delete account
              </Button>
            </Container>
          </SettingsForm>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
