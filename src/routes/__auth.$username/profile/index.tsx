import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import useAuth from "../../../hooks/useAuth";
import { SyntheticEvent, useState } from "react";
import ChangePassword from "../../../components/ManageProfile/ChangePassword";
import UploadProfileImage from "../../../components/ManageProfile/UploadProfileImage";
import {
  useFetchAccountDetails,
  useFollowUnFollowUser,
} from "../../../feature/account/queries";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import UnfollowUserDialog from "../../../components/UnfollowUserDialog";
import { useSnackbar } from "notistack";
import { UserFollowActions } from "../../../types/User";

export const Route = createFileRoute("/__auth/$username/profile/")({
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
  const { username } = Route.useParams();
  const {
    data: profile,
    isLoading: isProfileLoading,
    refetch,
  } = useFetchAccountDetails(username);
  const { mutate: followUnfollow } = useFollowUnFollowUser();

  // const {
  //   data: posts,
  //   isLoading: arePostsLoading,
  //   refetch,
  // } = useFetchMyPosts();
  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState<null | string>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const openDialog = (type: string) => setDialogOpen(type);

  const closeDialog = () => setDialogOpen(null);

  const handleFollowUnfollow = (action: UserFollowActions, userId: number) => {
    followUnfollow(
      { action, userId },
      {
        onSuccess: () => {
          refetch();
        },
        onError: () => {
          enqueueSnackbar("An error occured. Please try again later.", {
            variant: "error",
          });
        },
      }
    );
  };

  if (isProfileLoading) {
    return (
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "calc(100vh - 56px)",
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user && profile) {
    const isOwnProfile = user.id === profile.id;

    return (
      <>
        <Container maxWidth="md" sx={{ my: 5 }}>
          {profile && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                {profile.profileImage && (
                  <Avatar
                    sx={{ width: 150, height: 150, fontSize: 50 }}
                    alt={profile.name}
                    src={profile.profileImage}
                  />
                )}
                {!profile.profileImage && (
                  <Avatar
                    sx={{ width: 150, height: 150, fontSize: 50 }}
                    alt={profile.name}
                  >
                    {profile.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <Box>
                  <Typography component="h1" variant="h2">
                    {profile.name}
                  </Typography>
                  <Typography
                    sx={{ mt: 0.5, opacity: 0.6 }}
                    component="h1"
                    variant="h4"
                  >
                    {profile.username}
                  </Typography>
                  {!isOwnProfile && (
                    <>
                      {!profile.isFollowing && (
                        <Button
                          onClick={() =>
                            handleFollowUnfollow(
                              UserFollowActions.FOLLOW,
                              profile.id
                            )
                          }
                          startIcon={<AddIcon />}
                          sx={{ mt: 2 }}
                          variant="contained"
                          color="primary"
                        >
                          Follow
                        </Button>
                      )}
                      {profile.isFollowing && (
                        <Button
                          onClick={() => openDialog("unfollow")}
                          startIcon={<CheckIcon />}
                          sx={{ mt: 2 }}
                          variant="outlined"
                          color="primary"
                        >
                          Following
                        </Button>
                      )}
                    </>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  maxWidth: "420px",
                  mx: "auto",
                  mt: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography fontWeight={700} lineHeight={1.2} fontSize={30}>
                    {profile.totalPosts}
                  </Typography>
                  <Typography>Posts</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={700} lineHeight={1.2} fontSize={30}>
                    {profile.followers}
                  </Typography>
                  <Typography>Followers</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={700} lineHeight={1.2} fontSize={30}>
                    {profile.following}
                  </Typography>
                  <Typography>Following</Typography>
                </Box>
              </Box>
              {isOwnProfile && (
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
                    {/* {arePostsLoading && (
                      <Stack spacing={2}>
                        {Array.from({ length: 8 }).map((_, index) => (
                          <Skeleton
                            sx={{ transform: "none" }}
                            height={200}
                            key={index}
                          />
                        ))}
                      </Stack>
                    )}
                    {posts && (
                      <Posts
                        queryKey={["user", "myPosts"]}
                        posts={posts}
                        refetch={refetch}
                      />
                    )} */}
                  </TabPanel>
                  <TabPanel value={activeTab} index={1}>
                    <UploadProfileImage />
                  </TabPanel>
                  <TabPanel value={activeTab} index={2}>
                    <ChangePassword />
                  </TabPanel>
                </Paper>
              )}
            </>
          )}
        </Container>
        <UnfollowUserDialog
          isSubmitting={false}
          open={dialogOpen === "unfollow"}
          handleClose={closeDialog}
          handleUserUnfollow={() => {
            handleFollowUnfollow(UserFollowActions.UNFOLLOW, profile.id);
            closeDialog();
          }}
        />
      </>
    );
  }

  return null;
}
