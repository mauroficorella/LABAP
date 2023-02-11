import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/Landing/AppBar";
import Toolbar from "../components/Landing/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch", //20
    },
  },
}));

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function MainAppBar() {
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearchInput = async () => {
    console.log(searchInput);
    await axios
      .get("http://localhost:8000/search/" + searchInput)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const navigateTo = useNavigate();
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          href="/homepage/"
          sx={{ fontSize: 24 }}
        >
          {"MyPics"}
        </Link>
        <Box sx={{ display: { xs: "none", md: "flex", margin: 10 } }}>
          <Tooltip title="Homepage">
            <IconButton
              size="large"
              aria-label="settings of account"
              color="inherit"
              href="/homepage/"
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add a pic">
            <IconButton
              size="large"
              edge="end"
              aria-label="add a pic"
              aria-haspopup="true"
              color="inherit"
              href="/add-pic/"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Search>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearchInput}
          >
            Search
          </Button>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Settings">
            <IconButton
              size="large"
              aria-label="settings of account"
              color="inherit"
              onClick={() => {
                navigateTo("/user-settings/", {
                  //COPIARE QUESTA COSA ANCHE SOTTO NELL'ICONA PER ANDARE ALLA PAGINA DELL'UTENTE
                  //IN MODO DA PORTARSI APPRESSO IL NOME DELL'UTENTE DA USARE IN QUELLA PAGINA
                });
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                return navigateTo("/user-profile/", {
                  //COPIARE QUESTA COSA ANCHE SOTTO NELL'ICONA PER ANDARE ALLA PAGINA DELL'UTENTE
                  //IN MODO DA PORTARSI APPRESSO IL NOME DELL'UTENTE DA USARE IN QUELLA PAGINA
                  //state: { username: props.username, user_id: props.user_id, profile_pic: props.profile_pic},
                });
              }}
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
