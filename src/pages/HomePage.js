import { PersonAddRounded } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Profile from "../features/user/Profile";
import FriendList from "../features/friends/FriendList";
import FriendRequests from "../features/friends/FriendRequests";
import AddFriend from "../features/friends/AddFriend";
import { Container } from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { capitalCase } from "change-case";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import ProfileCover from "../features/user/ProfileCover";
import styled from "@emotion/styled";
import SendIcon from '@mui/icons-material/Send';
import SentRequests from "../features/friends/SentRequests"
const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function HomePage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");
  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };
  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <Profile profile={user} />,
    },
    {
      value: "friends",
      icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: <FriendList />,
    },
    {
      value: "requests",
      icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
      component: <FriendRequests />,
    },
    {
      value: "requests sent",
      icon: <SendIcon sx={{ fontSize: 24 }} />,
      component: <SentRequests/>,
    },
    {
      value: "add_friend",
      icon: <PersonAddIcon sx={{ fontSize: 24 }} />,
      component: <AddFriend />,
    },
  ];
  return (
    <Container>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: "relative",
        }}
      >
        <ProfileCover profile={user} />
        <TabsWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>

      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default HomePage;
