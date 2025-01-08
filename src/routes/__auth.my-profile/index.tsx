import {
  Avatar,
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import useAuth from "../../hooks/useAuth";
import { SyntheticEvent, useState } from "react";
import ChangePassword from "../../components/ManageProfile/ChangePassword";
import UploadProfileImage from "../../components/ManageProfile/UploadProfileImage";

export const Route = createFileRoute("/__auth/my-profile/")({
  component: MyProfile,
});

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 4, px: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function MyProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ my: 5 }}>
        {user && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              {user.profileImage && (
                <Avatar
                  sx={{ width: 150, height: 150, fontSize: 50 }}
                  alt={user.name}
                  src={user.profileImage}
                />
              )}
              {!user.profileImage && (
                <Avatar
                  sx={{ width: 150, height: 150, fontSize: 50 }}
                  alt={user.name}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <Box>
                <Typography component="h1" variant="h2">
                  {user.name}
                </Typography>
                <Typography
                  sx={{ mt: 0.5, opacity: 0.6 }}
                  component="h1"
                  variant="h4"
                >
                  {user.username}
                </Typography>
              </Box>
            </Box>
            <Paper sx={{ mt: 10, overflow: "hidden" }}>
              <Tabs
                variant="fullWidth"
                value={activeTab}
                onChange={handleTabChange}
                centered
              >
                <Tab
                  sx={{ p: 2, m: 0, borderRadius: 0 }}
                  {...a11yProps(0)}
                  label="Posts"
                />
                <Tab
                  sx={{ p: 2, m: 0, borderRadius: 0 }}
                  {...a11yProps(1)}
                  label="Upload profile picture"
                />
                <Tab
                  sx={{ p: 2, m: 0, borderRadius: 0 }}
                  {...a11yProps(2)}
                  label="Change password"
                />
              </Tabs>
              <TabPanel value={activeTab} index={0}>
                Posts
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <UploadProfileImage />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <ChangePassword />
              </TabPanel>
            </Paper>
          </>
        )}
      </Container>
    </>
  );
}
