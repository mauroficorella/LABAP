import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import React, { createContext, useCallback, useEffect, useState } from "react";
import theme from "../Landing/theme";
import MainAppBar from "../MainAppBar";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import MasornyImageListSearch from "./MasornyImageListSearch";



export default function SearchPage() {
  const [imageListType, setImageListType] = useState("popular");

  //questa cosa serve per portarsi appresso le cose da una pagina all'altra
  const location = useLocation();
  console.log("LOCATION.STATE");
  console.log(location.state);

  const { user } = useAuth();

  const showSearchedImageList = () => {
    setImageListType("followed");
  };

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
          <Box sx={{ mr: 3, ml: 3 }}>
            <MasornyImageListSearch
              searchInput={location.state}
            ></MasornyImageListSearch>
          </Box>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
