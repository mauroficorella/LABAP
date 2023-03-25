import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import theme from "../Landing/theme";
import React, { useCallback, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import SettingsForm from "./SettingsForm";
import { useAuth } from "../../hooks/useAuth";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as API from "../../api";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import { ProfilePicDropzone } from "./ProfilePicDropzone";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function UserSettings() {
  const { user, setUser } = useAuth();

  //questo serve per usare gli hooks e tornare alla pagina iniziale dopo l'eliminazione dell'account
  const { logout } = useAuth();

  const [openUsername, setOpenUsername] = React.useState(false);

  const handleClickUsername = () => {
    setOpenUsername(true);
  };

  const handleCloseUsername = () => {
    setOpenUsername(false);
  };

  const [openEmail, setOpenEmail] = React.useState(false);

  const handleClickEmail = () => {
    setOpenEmail(true);
  };

  const handleCloseEmail = () => {
    setOpenEmail(false);
  };

  const [openPassword, setOpenPassword] = React.useState(false);

  const handleClickPassword = () => {
    setOpenPassword(true);
  };

  const handleClosePassword = () => {
    setOpenPassword(false);
  };

  const [openPic, setOpenPic] = React.useState(false);
  const [fbImgUrl, setFbImgUrl] = useState("");

  const handleClickPic = () => {
    setOpenPic(true);
  };

  const handleClosePic = () => {
    console.log("called handleClick");

    var formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    axios
      .post("http://localhost:8000/uploadpic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        console.log(response.data);
        //console.log(response.data.fb_img_url);
        console.log("TYPE" + response.data.type);
        setFbImgUrl(response.data);
        console.log("FBIMGURL: " + fbImgUrl);

        axios
          .post("http://localhost:8000/updateprofilepic", {
            user_id: user.user_id,
            profile_pic: fbImgUrl
          })
          .then(function () {
            setUser({
              username: user.username,
              user_id: user.user_id,
              profile_pic: fbImgUrl,
              email: user.email,
              password: user.password,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpenPic(false);

  };

  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);

  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2);

  const [showPassword3, setShowPassword3] = useState(false);
  const handleClickShowPassword3 = () => setShowPassword3(!showPassword3);
  const handleMouseDownPassword3 = () => setShowPassword3(!showPassword3);

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
    fetch(`${API.API_URL}/api/stop_handler`, {
      method: "GET",
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    logout();
  }

  const [selectedImages, setSelectedImages] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    // ! link che fa vedere come si fa a passare parametri dal figlio al padre, magari torna utile: https://bobbyhadz.com/blog/react-pass-data-from-child-to-parent
    setAcceptedFiles(acceptedFiles);
    console.log(acceptedFiles);
    setSelectedImages(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            <Fab
              size="small"
              color="secondary"
              sx={{ position: "relative", bottom: 3, left: 130 }}
              onClick={handleClickPic}
            >
              <CreateIcon fontSize="small" />
            </Fab>
            <Avatar
              alt={user.username}
              src={user.profile_pic}
              sx={{ width: 128, height: 128 }}
            />
            <Dialog open={openPic} onClose={handleClosePic}>
              <DialogTitle color="secondary">Change Profile Pic</DialogTitle>
              <DialogContent sx={{ minWidth: 500 }}>
                <ProfilePicDropzone
                  onDrop={onDrop}
                  selectedImages={selectedImages}
                ></ProfilePicDropzone>
              </DialogContent>
              <DialogActions>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleClosePic}
                >
                  Cancel
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleClosePic}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
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
                onClick={handleClickUsername}
              >
                Edit
              </Button>
              <Dialog open={openUsername} onClose={handleCloseUsername}>
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
                    onClick={handleCloseUsername}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleCloseUsername}
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
                onClick={handleClickEmail}
              >
                Edit
              </Button>
              <Dialog open={openEmail} onClose={handleCloseEmail}>
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
                    onClick={handleCloseEmail}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleCloseEmail}
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
                <Typography
                  variant="h5"
                  fontSize="15pt"
                  sx={{ mb: 0.5 }} //TODO: la password è da nascondere
                >
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
                onClick={handleClickPassword}
              >
                Edit
              </Button>
              <Dialog open={openPassword} onClose={handleClosePassword}>
                <DialogTitle color="secondary">Change Password</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="old-password"
                    label="Old password"
                    type="password"
                    fullWidth
                    variant="standard"
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                          >
                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="New password"
                    type="password"
                    fullWidth
                    variant="standard"
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                          >
                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="confirm-password"
                    label="Confirm password"
                    type="password"
                    fullWidth
                    variant="standard"
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword3}
                            onMouseDown={handleMouseDownPassword3}
                          >
                            {showPassword3 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleClosePassword}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleClosePassword}
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
              width: "92%",
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
    </ThemeProvider>
  );
}
