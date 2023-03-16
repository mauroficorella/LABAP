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
import CircleIcon from "@mui/icons-material/Circle";
import { Container } from "@mui/system";

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
  notificationsArray: any[];
}

export default function NotificationList(props: NotificationProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Not read" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <List
            sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
          >
            {props.notificationsArray.map((notification, index) => (
              <ListItemButton key={index}>
                <ListItem alignItems="center" divider key={index}>
                  <ListItemAvatar>
                    <CircleIcon
                      sx={{ fontSize: 10, ml: -1 }}
                      color="secondary"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Box
                          sx={{
                            display: "flex",
                            ml: -3,
                          }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                          <Box sx={{ ml: 1 }}>
                            <Typography
                              sx={{ display: "inline" }}
                              component={"span"}
                              variant="body1"
                              color="text.primary"
                            >
                              Utente
                            </Typography>

                            {" — ha messo mi piace alla tua foto"}
                          </Box>
                        </Box>
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
            <ListItemButton>
              <ListItem alignItems="center" divider>
                <ListItemAvatar>
                  <CircleIcon sx={{ fontSize: 10, ml: -1 }} color="secondary" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Box
                        sx={{
                          display: "flex",
                          ml: -3,
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                        <Box sx={{ ml: 1 }}>
                          <Typography
                            sx={{ display: "inline" }}
                            component={"span"}
                            variant="body1"
                            color="text.primary"
                          >
                            Utente
                          </Typography>
                          {" — ha messo mi piace alla tua foto"}
                        </Box>
                      </Box>
                    </React.Fragment>
                  }
                  //secondary={}
                />
              </ListItem>
            </ListItemButton>
          </List>
        </TabPanel>
      </Box>
    </Box>
  );
}
