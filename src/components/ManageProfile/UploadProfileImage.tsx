import { useSnackbar } from "notistack";
import { useUpdateProfileImage } from "../../feature/account/queries";
import useAuth from "../../hooks/useAuth";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Dropzone from "react-dropzone";

function UploadProfileImage() {
  const { mutate: updateProfileImage, isPending: isUploadingProfileImage } =
    useUpdateProfileImage();
  const { setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

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

  return (
    <Box sx={{ maxWidth: 400, mx: "auto" }}>
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
  );
}

export default UploadProfileImage;
