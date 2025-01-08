import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "../Card";
import FormContainer from "../FormContainer";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import axiosInstance from "../../axios";
import { AxiosError } from "axios";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),
  confirm_password: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
  password: "",
  confirm_password: "",
};

export default function ResetPassword() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: FormValues) => {
    if (!("token" in search)) {
      return;
    }
    try {
      await axiosInstance.post("/users/reset-password", {
        password: values.password,
        token: search.token,
      });
      enqueueSnackbar("Password has been reset successfully", {
        variant: "success",
      });
      navigate({ to: "/" });
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 400:
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
          Reset password
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, values, isSubmitting }) => (
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
                    Confirm password
                  </FormLabel>
                  <Field
                    as={TextField}
                    value={values.confirm_password}
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
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </FormContainer>
  );
}
