import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useRef } from "react";

export const Route = createLazyFileRoute("/__auth/feed/")({
  component: RouteComponent,
});

function RouteComponent() {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={1}
        sx={{ p: 2, bgcolor: "common.white", border: "1px solid #efefef" }}
      >
        <TextField
          fullWidth
          id="username"
          type="username"
          name="username"
          placeholder="Post title"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Editor
          apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue=""
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
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button variant="contained" color="primary">
            Post
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
