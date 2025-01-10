import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type DeletePostDialogProps = {
  open: boolean;
  handleClose: () => void;
  isSubmitting: boolean;
  handleDeletePost: () => void;
};

function DeletePostDialog({
  open,
  isSubmitting,
  handleClose,
  handleDeletePost,
}: DeletePostDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-delete-dialog-title"
      aria-describedby="alert-delete-dialog-description"
    >
      <DialogTitle id="alert-delete-dialog-title">Delete post</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-dialog-description">
          Are you sure you want to delete this post?
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
          onClick={handleDeletePost}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePostDialog;
