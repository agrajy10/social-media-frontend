import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useUpdatePassword } from "../../feature/account/queries";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import axios from "axios";

const passwordFormValidationSchema = Yup.object({
  new_password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),
  current_password: Yup.string().required("Required"),
});

export type ChangePasswordFormValues = Yup.InferType<
  typeof passwordFormValidationSchema
>;

const initialValues: ChangePasswordFormValues = {
  new_password: "",
  current_password: "",
};

function ChangePassword() {
  const { mutate: updatePassword, isPending: isUpdatingPassword } =
    useUpdatePassword();
  const { enqueueSnackbar } = useSnackbar();

  const handleProfilePasswordChange = (values: ChangePasswordFormValues) => {
    updatePassword(values, {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          return enqueueSnackbar(error.response?.data.message, {
            variant: "error",
          });
        }
        return enqueueSnackbar("An error occurred. Please try again", {
          variant: "error",
        });
      },
      onSuccess: () =>
        enqueueSnackbar("Password updated successfully", {
          variant: "success",
        }),
    });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={passwordFormValidationSchema}
        onSubmit={handleProfilePasswordChange}
      >
        {({ values, errors, touched }) => (
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
                <FormLabel htmlFor="current_password">
                  Current Password
                </FormLabel>
                <Field
                  as={TextField}
                  value={values.current_password}
                  error={
                    touched.current_password && Boolean(errors.current_password)
                  }
                  helperText={
                    touched.current_password && errors.current_password
                  }
                  name="current_password"
                  placeholder="••••••"
                  type="password"
                  id="current_password"
                  fullWidth
                  variant="outlined"
                  color={
                    touched.current_password && Boolean(errors.current_password)
                      ? "error"
                      : "primary"
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="new_password">New Password</FormLabel>
                <Field
                  as={TextField}
                  error={touched.new_password && Boolean(errors.new_password)}
                  helperText={touched.new_password && errors.new_password}
                  name="new_password"
                  placeholder="••••••"
                  type="password"
                  id="new_password"
                  fullWidth
                  variant="outlined"
                  color={
                    touched.new_password && Boolean(errors.new_password)
                      ? "error"
                      : "primary"
                  }
                />
              </FormControl>
              <Button
                disabled={isUpdatingPassword}
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
    </Box>
  );
}

export default ChangePassword;
