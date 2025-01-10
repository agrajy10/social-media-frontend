import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import AddPost from "../AddPost";
import CloseIcon from "@mui/icons-material/Close";

type EditPostDialogProps = {
  title: string;
  content: string;
  open: boolean;
  handleClose: () => void;
  handleEditPost: ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => void;
  isSubmitting: boolean;
};

function EditPostDialog({
  title,
  content,
  open,
  handleClose,
  handleEditPost,
  isSubmitting,
}: EditPostDialogProps) {
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 700,
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-edit-dialog-title"
      aria-describedby="alert-edit-dialog-description"
    >
      <IconButton
        size="small"
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 32,
          height: 32,
          color: "inherit",
        }}
      >
        <CloseIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <DialogTitle id="alert-edit-dialog-title">Edit Post</DialogTitle>
      <DialogContent>
        <AddPost
          postContent={content}
          postTitle={title}
          onSubmit={(postTitle, postContent) =>
            handleEditPost({ title: postTitle, content: postContent })
          }
          isSubmitting={isSubmitting}
          isEditing
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditPostDialog;
