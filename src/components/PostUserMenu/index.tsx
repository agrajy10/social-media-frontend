import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MouseEvent, useState } from "react";

interface PostUserMenuProps {
  onDeleteBtnClick?: () => void;
  onEditBtnClick?: () => void;
}

function PostUserMenu({ onEditBtnClick, onDeleteBtnClick }: PostUserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={openMenu} sx={{ py: 0, height: 32, width: 32 }}>
        <MoreHorizIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem sx={{ fontSize: 12 }} onClick={() => {
          onEditBtnClick?.();
          handleClose();
        }}>
          Edit Post
        </MenuItem>
        <MenuItem
          sx={{ fontSize: 12 }}
          onClick={() => {
            onDeleteBtnClick?.();
            handleClose();
          }}
        >
          Delete Post
        </MenuItem>
      </Menu>
    </>
  );
}

export default PostUserMenu;
