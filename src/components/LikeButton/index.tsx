import { IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

type LikeButtonProps = {
  onClick: () => void;
  isLiked: boolean;
  likes: number;
};

function LikeButton({ onClick, isLiked = false, likes }: LikeButtonProps) {
  return (
    <>
      <Typography variant="caption">Likes : {likes}</Typography>
      <IconButton
        onClick={onClick}
        sx={{
          border: "none",
          borderRadius: "50%",
          p: 0,
          width: 24,
          height: 24,
          color: isLiked ? "#9b0909" : "inherit",
          "&:hover": {
            background: "none",
            color: "#9b0909",
          },
        }}
        size="small"
      >
        {isLiked && <FavoriteIcon />}
        {!isLiked && <FavoriteBorderIcon />}
      </IconButton>
    </>
  );
}

export default LikeButton;
