import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "../Card";
import FormContainer from "../FormContainer";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link as TanstackLink } from "@tanstack/react-router";
import { Link } from "@mui/material";
import { useSnackbar } from "notistack";
import axiosInstance from "../../axios";
import { AxiosError } from "axios";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
  email: "",
};

export default function ForgotPassword() {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await axiosInstance.post("/users/forgot-password", values);
      enqueueSnackbar("Link to reset password has been sent to your email", {
        variant: "success",
      });
      resetForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 400:
            return enqueueSnackbar(error.response?.data.errors[0].message, {
              variant: "error",
            });
          default:
            return enqueueSnackbar("Something went wrong. Please try again", {
              variant: "error",
            });
        }
      }
      enqueueSnackbar("Something went wrong. Please try again", {
        variant: "error",
      });
    }
  };

  return (
    <FormContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Forgot password
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    as={TextField}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    fullWidth
                    variant="outlined"
                    color={
                      touched.email && Boolean(errors.email)
                        ? "error"
                        : "primary"
                    }
                  />
                </FormControl>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Send reset password link
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Go back to{" "}
            <Link
              to="/"
              component={TanstackLink}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </FormContainer>
  );
}
