import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "../Card";
import FormContainer from "../FormContainer";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link as TanstackLink } from "@tanstack/react-router";
import { Link } from "@mui/material";
import { useSnackbar } from "notistack";
import axiosInstance from "../../axios";
import { AxiosError } from "axios";

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
  username: "",
  password: "",
};

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: FormValues) => {
    try {
      const { data } = await axiosInstance.post("/user/login", values);
      window.localStorage.setItem("token", data.data.token);
      enqueueSnackbar("Signed in successfully", { variant: "success" });
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 401:
            return enqueueSnackbar(error.response?.data.message, {
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
          Sign in
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
                  <FormLabel htmlFor="username">Email or username</FormLabel>
                  <Field
                    as={TextField}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    id="username"
                    type="username"
                    name="username"
                    placeholder="johndoe@username.com or johndoe196"
                    fullWidth
                    variant="outlined"
                    color={
                      touched.username && Boolean(errors.username)
                        ? "error"
                        : "primary"
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={TextField}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    fullWidth
                    variant="outlined"
                    color={
                      touched.password && Boolean(errors.password)
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
                  Sign in
                </Button>
                <Link
                  to="/forgot-password"
                  component={TanstackLink}
                  type="button"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Forgot your password?
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              component={TanstackLink}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Card>
    </FormContainer>
  );
}
