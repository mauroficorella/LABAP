import * as React from "react";
import Welcome from "./Welcome";
import AppAppBar from "./AppAppBar";
import withRoot from "./withRoot";
import Homepage from "../Homepage";
import MainAppBar from "../MainAppBar";
import UserProfile from "../UserProfile";

function Index() {
  return (
    <React.Fragment>
      <UserProfile />
      <MainAppBar />
    </React.Fragment>
  );
}

export default withRoot(Index);

/*<AppAppBar />
      <Welcome />*/
