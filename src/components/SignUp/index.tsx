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
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link as TanstackLink } from "@tanstack/react-router";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

export default function SignUp() {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
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
                  <TextField
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
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
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
                  <TextField
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
                  <TextField
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
