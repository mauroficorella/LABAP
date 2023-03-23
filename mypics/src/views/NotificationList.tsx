import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface NotificationProps {
  notificationsArray: any;
}

export default function NotificationList(props: NotificationProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // ! (riga 114 circa)  ! PORTARCI APPRESSO IL NOME E COGNOME DELL'UTENTE
  // ! INVECE DELL USERID e ANCHE LA FOTO SU CUI E' STATO MESSO IL MI PIACE O E' STATO MESSO IL COMMENTO

  console.log(props.notificationsArray);

  function handleNotificationClick(event: any, notification_type: string) {}

  if (props.notificationsArray.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          ml: 6,
        }}
      >
        <List sx={{ width: 400, maxWidth: 400, bgcolor: "background.paper" }}>
          <ListItem alignItems="center">
            <ListItemText
              primary={
                <React.Fragment>
                  <Box>{"No notifications available"}</Box>
                </React.Fragment>
              }
              //secondary={}
            />
          </ListItem>
        </List>
      </Box>
    );
  } else {
    return (
      <Box
        display="flex"
        justifyContent="center"
        sx={{ maxHeight: "90vh", overflow: "auto" }}
      >
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              //centered
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label="Not read" {...a11yProps(0)} />
              <Tab label="Read" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <List
              sx={{ width: 400, maxWidth: 400, bgcolor: "background.paper" }}
            >
              {props.notificationsArray[0]["not_read_notifications"][0][
                "not_read_list"
              ].map((notification: any, index: any) => (
                <ListItemButton key={index}>
                  <ListItem alignItems="center" divider key={index}>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Link
                            to={
                              notification.notification_type === "follow"
                                ? "/user-profile/"
                                : "/pic/"
                            }
                            state={
                              notification.origin_user_id
                            } /* TODO: mettere il controllo come sopra in base al notification type, e se è follow ritornare l'user_id altrimenti tutte le info che vuole la pagina Pic  */
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                ml: -3,
                              }}
                            >
                              <Avatar
                                alt={"Profile Pic"}
                                src={notification.origin_profile_pic}
                              />
                              <Box sx={{ ml: 1 }}>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component={"span"}
                                  variant="body1"
                                  color="text.primary"
                                >
                                  {"User " + notification.origin_username}
                                </Typography>
                                {notification.notification_type === "follow"
                                  ? " started following you"
                                  : notification.notification_type === "like"
                                  ? " liked your picture " +
                                    notification.notification_type
                                  : " commented on your picture" +
                                    notification.post_title}{" "}
                              </Box>
                            </Box>
                          </Link>
                        </React.Fragment>
                      }
                      //secondary={}
                    />
                  </ListItem>
                </ListItemButton>
              ))}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <List
              sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
            >
              {props.notificationsArray[0]["read_notifications"][0][
                "read_list"
              ].map((notification: any, index: any) => (
                <ListItemButton
                  key={index}
                  onClick={(event) =>
                    handleNotificationClick(
                      event,
                      notification.notification_type
                    )
                  }
                >
                  <ListItem alignItems="center" divider key={index}>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Link
                            to="/user-profile/"
                            state={notification.origin_user_id}
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                ml: -3,
                              }}
                            >
                              <Avatar
                                alt={"Profile Pic"}
                                src={notification.origin_profile_pic}
                              />
                              <Box sx={{ ml: 1 }}>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component={"span"}
                                  variant="body1"
                                  color="text.primary"
                                >
                                  {"User " + notification.origin_username}
                                </Typography>
                                {notification.notification_type === "follow"
                                  ? " started following you"
                                  : notification.notification_type === "like"
                                  ? " liked your picture " +
                                    notification.notification_type
                                  : " commented on your picture" +
                                    notification.post_title}{" "}
                              </Box>
                            </Box>
                          </Link>
                        </React.Fragment>
                      }
                      //secondary={}
                    />
                  </ListItem>
                </ListItemButton>
              ))}
            </List>
          </TabPanel>
        </Box>
      </Box>
    );
  }
}
