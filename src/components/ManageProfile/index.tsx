import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import Dropzone from "react-dropzone";
import {
  useUpdatePassword,
  useUpdateProfileImage,
} from "../../feature/account/queries";
import { useSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";
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

function ManageProfile() {
  const { mutate: updateProfileImage, isPending: isUploadingProfileImage } =
    useUpdateProfileImage();
  const { mutate: updatePassword, isPending: isUpdatingPassword } =
    useUpdatePassword();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useAuth();

  const handleProfileImageUpload = (values: { profile_image: File | null }) => {
    if (!values.profile_image) return;
    updateProfileImage(values.profile_image, {
      onError: () =>
        enqueueSnackbar("An error occurred. Please try again", {
          variant: "error",
        }),
      onSuccess: (data) => {
        enqueueSnackbar("Profile picture updated successfully", {
          variant: "success",
        });
        setUser(data);
      },
    });
  };

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
    <Stack spacing={2}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Upload Profile Picture
        </Typography>
        <Formik
          initialValues={{
            profile_image: null,
          }}
          onSubmit={handleProfileImageUpload}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values, setFieldError, setFieldValue, errors }) => (
            <Form>
              <Dropzone
                onDropAccepted={(files) => {
                  setFieldError("profile_image", "");
                  setFieldValue("profile_image", files[0]);
                }}
                onDropRejected={(fileRejections) =>
                  setFieldError(
                    "profile_image",
                    fileRejections[0].errors[0].message
                  )
                }
                accept={{
                  "image/png": [".png"],
                  "image/jpeg": [".jpg", ".jpeg"],
                }}
                maxSize={1024 * 1024}
                multiple={false}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <Box
                    sx={{
                      cursor: "pointer",
                      borderRadius: 1,
                      border: "2px dashed #ccc",
                      textAlign: "center",
                      p: 2,
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {acceptedFiles.length > 0
                      ? acceptedFiles[0].name
                      : "Select a profile picture to upload"}
                  </Box>
                )}
              </Dropzone>
              {errors.profile_image && (
                <FormHelperText error>{errors.profile_image}</FormHelperText>
              )}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isUploadingProfileImage || !values.profile_image}
                sx={{ mt: 2 }}
              >
                Upload
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Change Password
        </Typography>
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
                      touched.current_password &&
                      Boolean(errors.current_password)
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
                      touched.current_password &&
                      Boolean(errors.current_password)
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
    </Stack>
  );
}

export default ManageProfile;
