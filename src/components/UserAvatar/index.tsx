import { Avatar } from "@mui/material";

const UserAvatar = ({
  profileImage,
  username,
}: {
  profileImage: string | null;
  username: string;
}) => {
  if (profileImage) {
    return (
      <Avatar
        sx={{ width: 24, height: 24 }}
        alt={username}
        src={profileImage}
      />
    );
  }

  return (
    <Avatar sx={{ width: 24, height: 24, fontSize: 13 }}>
      {username.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
