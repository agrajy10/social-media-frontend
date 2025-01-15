import { Box, Button, TextField } from "@mui/material";
import { FastField, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  content: Yup.string().required("Required"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValue: FormValues = {
  content: "",
};

type AddCommentProps = {
  isSubmitting: boolean;
  onSubmit: (content: string, resetForm: () => void) => void;
};

function AddComment({ isSubmitting, onSubmit }: AddCommentProps) {
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(
        values: FormValues,
        { resetForm }: FormikHelpers<FormValues>
      ) => onSubmit(values.content, resetForm)}
    >
      {({ values }) => (
        <Form>
          <Box
            sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 1 }}
          >
            <FastField
              name="content"
              as={TextField}
              fullWidth
              placeholder="Add a comment..."
            />
            <Button
              disabled={!values.content || isSubmitting}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Comment
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default AddComment;
