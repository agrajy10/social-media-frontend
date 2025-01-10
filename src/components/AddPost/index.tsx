import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { ChangeEvent, useRef, useState } from "react";
import { Box, Button, FormHelperText, Paper, TextField } from "@mui/material";

export type CreatePostFormValues = {
  title: string;
  content: string;
};

type AddPostProps = {
  postTitle?: string;
  postContent?: string;
  onSubmit: (title: string, content: string) => void;
  isSubmitting: boolean;
};

function AddPost({
  onSubmit,
  isSubmitting,
  postTitle = "",
  postContent = "",
}: AddPostProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [title, setTitle] = useState<string>(postTitle);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleValidation = () => {
    let hasError = false;
    if (!title) {
      hasError = true;
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
    }
    if (!editorRef.current?.getContent()) {
      hasError = true;
      setErrors((prev) => ({ ...prev, content: "Content is required" }));
    }
    return !hasError;
  };

  const handeSubmit = async () => {
    setErrors({});
    if (!handleValidation()) return;
    try {
      await onSubmit(title, editorRef.current?.getContent() || "");
      editorRef.current?.setContent("");
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{ p: 2, bgcolor: "common.white", border: "1px solid #efefef" }}
    >
      <TextField
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        value={title}
        fullWidth
        type="text"
        name="username"
        placeholder="Post title"
        variant="outlined"
        sx={{ mb: 2 }}
        error={!!errors?.title}
        helperText={errors?.title}
      />
      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={postContent}
        init={{
          placeholder: "What's on your mind today?",
          height: 250,
          menubar: false,
          toolbar:
            "undo redo | blocks | " +
            "bold italic | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | " +
            "removeformat",
          content_style:
            "body { font-family:Inter,sans-serif; font-size:14px }",
        }}
      />
      {errors?.content && (
        <FormHelperText sx={{ mt: 1, ml: 2 }} error>
          {errors.content}
        </FormHelperText>
      )}
      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Button
          onClick={handeSubmit}
          disabled={isSubmitting}
          variant="contained"
          color="primary"
        >
          Post
        </Button>
      </Box>
    </Paper>
  );
}

export default AddPost;
