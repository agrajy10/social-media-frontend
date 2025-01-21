import {
  Avatar,
  ButtonBase,
  Container,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link as TanstackLink } from "@tanstack/react-router";

function TopBar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      sx={{
        py: 1,
        backgroundColor: "common.white",
        borderBottom: "1px solid #efefef",
      }}
      square
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography fontWeight={700} fontSize={20}>
          Social{" "}
          <Typography
            component="span"
            sx={{
              fontSize: "inherit",
              fontWeight: "inherit",
              color: "primary.main",
            }}
          >
            media
          </Typography>
        </Typography>
        <Link component={TanstackLink} to="/feed">
          Feed
        </Link>
        {user && (
          <>
            <ButtonBase sx={{ ml: "auto" }} onClick={openMenu}>
              {user.profileImage && (
                <Avatar alt={user.name} src={user.profileImage} />
              )}
              {!user.profileImage && (
                <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
              )}
            </ButtonBase>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              slotProps={{
                paper: {
                  sx: {
                    minWidth: 180,
                  },
                },
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: 15 }}>
                {user.name}
              </Typography>
              <Typography sx={{ fontSize: 12, opacity: 0.5 }}>
                {user.username}
              </Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <MenuItem
                sx={{
                  "& a": { textDecoration: "none", color: "common.black" },
                }}
                onClick={closeMenu}
              >
                <Link component={TanstackLink} to={`/${user.username}/profile`}>
                  <Typography>Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  logout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Container>
    </Paper>
  );
}

export default TopBar;
