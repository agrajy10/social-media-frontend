import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type UnfollowUserDialogProps = {
  open: boolean;
  handleClose: () => void;
  isSubmitting: boolean;
  handleUserUnfollow: () => void;
};

function UnfollowUserDialog({
  open,
  isSubmitting,
  handleClose,
  handleUserUnfollow,
}: UnfollowUserDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-delete-dialog-title"
      aria-describedby="alert-delete-dialog-description"
    >
      <DialogTitle id="alert-delete-dialog-title">Unfollow user</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-dialog-description">
          Are you sure you want to unfollow?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          disabled={isSubmitting}
          variant="outlined"
          color="primary"
          onClick={handleClose}
          autoFocus
        >
          Cancel
        </Button>
        <Button
          size="small"
          disabled={isSubmitting}
          variant="contained"
          color="error"
          onClick={handleUserUnfollow}
        >
          Unfollow
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UnfollowUserDialog;
