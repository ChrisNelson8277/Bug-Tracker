import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { signIn } from "../../Slices/authSlice";
import { useNavigate } from "react-router";
import "../../App.css";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Chris Nelson</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const LoginComponent = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const information = {
      user: data.get("email"),
      password: data.get("password"),
    };
    fetch("http://localhost:5000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        information,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        if (data.code === 200) {
          const newData = {
            role: data.role,
            name: data.name,
          };
          dispatch(signIn(newData));
          navigate("/home");
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  };
  const handleDemo = (event) => {
    event.preventDefault();
    const information = {
      user: "demo",
      password: "no password needed",
    };
    fetch("http://localhost:5000/login/demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        information,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        if (data.code === 200) {
          const newData = {
            role: data.role,
            name: data.name,
          };
          dispatch(signIn(newData));
          navigate("/home");
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="signin-bg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                bgcolor: "white",
                boxShadow: "1px 1px 7px gray",
                borderRadius: "10px",
                padding: "0rem 1rem",
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Button
                  onClick={handleDemo}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 0, mb: 2, bgcolor: "orange" }}
                >
                  DEMO SIGN IN
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginComponent;
