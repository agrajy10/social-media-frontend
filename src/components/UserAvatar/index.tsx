import { Avatar, Box } from "@mui/material";
import { Link } from "@tanstack/react-router";

type UserAvatarProps = {
  profileImage: string | null;
  username: string;
  width?: number;
  height?: number;
  fontSize?: number;
};

const UserAvatar = ({
  profileImage,
  username,
  width = 24,
  height = 24,
  fontSize = 13,
}: UserAvatarProps) => {
  if (profileImage) {
    return (
      <Box sx={{ "& a": { textDecoration: "none" } }}>
        <Link
          to="/$username/profile"
          params={{
            username,
          }}
        >
          <Avatar
            sx={{ width: width, height: height }}
            alt={username}
            src={profileImage}
          />
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ "& a": { textDecoration: "none" } }}>
      <Link
        to="/$username/profile"
        params={{
          username,
        }}
      >
        <Avatar sx={{ width: width, height: width, fontSize }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
      </Link>
    </Box>
  );
};

export default UserAvatar;
