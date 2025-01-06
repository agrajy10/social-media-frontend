import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "../Card";
import FormContainer from "../FormContainer";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link as TanstackLink, useNavigate } from "@tanstack/react-router";
import axiosInstance from "../../axios";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string().min(6, "Too Short!").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
  username: "",
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

export default function SignUp() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await axiosInstance.post("/users/register", values);
      resetForm();
      navigate({ to: "/" });
      enqueueSnackbar("Account created successfully", { variant: "success" });
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
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
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
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={TextField}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    fullWidth
                    variant="outlined"
                    color={
                      touched.name && Boolean(errors.name) ? "error" : "primary"
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                    as={TextField}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    id="username"
                    type="text"
                    name="username"
                    placeholder="johndoe196"
                    fullWidth
                    variant="outlined"
                    color={
                      touched.name && Boolean(errors.name) ? "error" : "primary"
                    }
                  />
                </FormControl>
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
                <FormControl>
                  <FormLabel htmlFor="confirm_password">
                    Confirm Password
                  </FormLabel>
                  <Field
                    as={TextField}
                    error={
                      touched.confirm_password &&
                      Boolean(errors.confirm_password)
                    }
                    helperText={
                      touched.confirm_password && errors.confirm_password
                    }
                    name="confirm_password"
                    placeholder="••••••"
                    type="password"
                    id="confirm_password"
                    fullWidth
                    variant="outlined"
                    color={
                      touched.confirm_password &&
                      Boolean(errors.confirm_password)
                        ? "error"
                        : "primary"
                    }
                  />
                </FormControl>
                <Button type="submit" fullWidth variant="contained">
                  Sign in
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              component={TanstackLink}
              to="/"
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
