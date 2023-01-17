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
import { useAuth } from "../../hooks/useAuth";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function UserSettings() {
  const { user } = useAuth();

  //questo serve per usare gli hooks e tornare alla pagina iniziale dopo l'eliminazione dell'account
  const { logout } = useAuth();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true); //TODO fare 3 cose diverse
  };

  const handleClose = () => {
    setOpen(false);
  };

  //funzione per cancellare l'account tramite una delete con axios e poi ridirezionare l'utente alla pagina iniziale
  async function deleteUser() {
    await axios
      .delete("http://localhost:8000/user/" + user.user_id)
      .then(function (response) {
        console.log(response);
        logout();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //funzione per fare semplicemente il logout e tornare alla pagina iniziale
  function logoutUser() {
    logout();
  }

  

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
                  alt={user.username}
                  src={user.profile_pic}
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
                    Username
                  </Typography>
                  <Typography variant="h5" fontSize="15pt" sx={{ mb: 0.5 }}>
                    {user.username}
                  </Typography>
                  <Divider light sx={{ mb: 1.5 }} />
                </Container>
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  component="a"
                  sx={{ minWidth: 70, ml: 1 }}
                  onClick={handleClickOpen}
                >
                  Edit
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle color="secondary">Change Username</DialogTitle>
                  <DialogContent sx={{ minWidth: 500 }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="username"
                      label="New username"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleClose}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
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
                    {user.email}
                  </Typography>
                  <Divider light sx={{ mb: 1.5 }} />
                </Container>
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ minWidth: 70, ml: 1 }}
                  onClick={handleClickOpen}
                >
                  Edit
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle color="secondary">Change Email</DialogTitle>
                  <DialogContent sx={{ minWidth: 500 }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      label="New email"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleClose}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
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
                    {user.password}
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
                  onClick={handleClickOpen}
                >
                  Edit
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle color="secondary">Change Password</DialogTitle>
                  <DialogContent sx={{ minWidth: 500 }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="username"
                      label="New username"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleClose}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
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
                onClick={logoutUser}
                sx={{ minWidth: 100 }}
              >
                Logout
              </Button>
              <Button
                color="secondary"
                variant="contained"
                component="a"
                //href="//"
                onClick={deleteUser}
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
