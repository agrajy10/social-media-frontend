import {
  Avatar,
  Button,
  ButtonBase,
  Container,
  FormControl,
  FormLabel,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Field, Form, Formik } from "formik";
import { useState, MouseEvent } from "react";

export const Route = createLazyFileRoute("/my-profile/change-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Paper
        sx={{
          py: 1,
          backgroundColor: "common.white",
          borderBottom: "1px solid #efefef",
        }}
        square
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontWeight={700} fontSize={20}>
            Social{" "}
            <Typography
              component="span"
              sx={{
                fontSize: "inherit",
                fontWeight: "inherit",
                color: "primary.main",
              }}
            >
              media
            </Typography>
          </Typography>
          <ButtonBase onClick={openMenu}>
            <Avatar>J</Avatar>
          </ButtonBase>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={closeMenu}>Profile</MenuItem>
            <MenuItem onClick={closeMenu}>Change password</MenuItem>
            <MenuItem onClick={closeMenu}>Logout</MenuItem>
          </Menu>
        </Container>
      </Paper>

      <Container maxWidth="xs" sx={{ my: 5 }}>
        <Paper
          square
          sx={{
            bgcolor: "common.white",
            border: "1px solid #efefef",
            p: 3,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              mb: 2,
            }}
          >
            Change password
          </Typography>
          <Formik
            initialValues={{
              current_password: "",
              new_password: "",
            }}
            onSubmit={() => {}}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel htmlFor="current_password">
                      Current password
                    </FormLabel>
                    <Field
                      as={TextField}
                      error={
                        touched.current_password &&
                        Boolean(errors.current_password)
                      }
                      helperText={
                        touched.current_password && errors.current_password
                      }
                      id="current_password"
                      type="password"
                      name="current_password"
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
                    <FormLabel htmlFor="password">New password</FormLabel>
                    <Field
                      as={TextField}
                      error={
                        touched.new_password && Boolean(errors.new_password)
                      }
                      helperText={touched.new_password && errors.new_password}
                      id="new_password"
                      type="password"
                      name="new_password"
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
                    disabled={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </>
  );
}
