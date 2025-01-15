import { Avatar } from "@mui/material";

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
      <Avatar
        sx={{ width: width, height: height }}
        alt={username}
        src={profileImage}
      />
    );
  }

  return (
    <Avatar sx={{ width: width, height: width, fontSize }}>
      {username.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
