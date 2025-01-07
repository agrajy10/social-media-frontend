import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Dropzone from "react-dropzone";
import { useUpdateProfileImage } from "../../feature/account/queries";
import { useSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";

function ManageProfile() {
  const { mutate } = useUpdateProfileImage();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useAuth();

  const handleProfileImageUpload = (values: { profile_image: File | null }) => {
    if (!values.profile_image) return;
    mutate(values.profile_image, {
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

  return (
    <>
      <Formik
        initialValues={{
          profile_image: null,
        }}
        onSubmit={handleProfileImageUpload}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, setFieldError, setFieldValue, isSubmitting, errors }) => (
          <Form>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upload Profile Picture
            </Typography>
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
              disabled={isSubmitting || !values.profile_image}
              sx={{ mt: 2 }}
            >
              Upload
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ManageProfile;
