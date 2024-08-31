import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import RotationAnimation from "./RotationAnimation/RotationAnimation";
import { GlobalContext } from "../Context/Context";

export const Login = () => {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const { setRole } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [loginSign, setLoginSign] = useState("Create Account");
  const [ask, setAsk] = useState("Already have an account ?");

  const handleusernameChange = (e) => {
    setusername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event) => {
    const login = async (url, roleValue, successMessage) => {
      try {
        const response = await axios.post(url, { username, password });
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          setRole(roleValue);
          navigate("/");
          alert(successMessage);
          return true;
        }
      } catch (error) {
        // This catches errors specific to this login attempt
        console.error(`Login attempt to ${url} failed:`, error);
      }
      return false;
    };

    try {
      // Sequentially try to log in as superadmin, school, or branch
      if (
        await login(
          "https://schoolmanagement-4-e1x2.onrender.com/superadmin/login",
          1,
          "Super Admin login successful"
        )
      )
        return;
      if (
        await login(
          "https://schoolmanagement-4-e1x2.onrender.com/school/login",
          2,
          "School login successful"
        )
      )
        return;
      if (
        await login(
          "https://schoolmanagement-4-e1x2.onrender.com/branch/login",
          3,
          "Branch login successful"
        )
      )
        return;

      // If no role matched, show an error
      alert("Incorrect username or password!");
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("An unexpected error occurred. Please try again.");
    }
    // event.preventDefault();

    // try {
    //   const res = await axios.post('http://localhost:5000/api/auth/login', {
    //     email,
    //     password
    //   });

    //   const token = res.data.token;
    //   setMessage('Login successful!');

    //   localStorage.setItem('authToken', token);

    // } catch (error) {
    //   setMessage('Invalid credentials, please try again.');
    // }
  };

  return (
    // <Container maxWidth="xs">
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Typography component="h1" variant="h5">
    //       Login
    //     </Typography>
    //     {message && <Alert severity={message.includes('successful') ? 'success' : 'error'}>{message}</Alert>}
    //     <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="email"
    //         label="Email Address"
    //         name="email"
    //         autoComplete="email"
    //         autoFocus
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="Password"
    //         type="password"
    //         id="password"
    //         autoComplete="current-password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         Login
    //       </Button>
    //       <Typography variant="body2" align="center">
    //         Don't have an account? <Link to="/signup">Sign Up</Link>
    //       </Typography>
    //     </Box>
    //   </Box>
    // </Container>

    <>
      <div className="loginContainer">
        <div className="logoAnimation">
          <div className="loginLogo">
            {/* Login/Signup Logo */}
            <img
              src="/credence tracker-02.png"
              className="loginLogoImg"
              alt="Logo"
            />
          </div>
          <RotationAnimation />
        </div>

        {/* ANIMATION ENDS HERE=================================== */}

        <div className="loginSignup">
          <h1>{loginSign}</h1>

          {/* <div className="nameInput">
          <input type="text" placeholder="First Name" className="nameInputElement" />
          <input type="text" placeholder="Last Name" className="nameInputElement" />
        </div> */}

          {/* <input type="text" placeholder="username" className="email" />

        <input type="password" placeholder="Password" className="password" /> */}

          <input
            type="username"
            id="form2Example1"
            className="form-control"
            placeholder="Enter Your username"
            value={username}
            autoComplete="username"
            onChange={handleusernameChange}
          />

          <input
            type="password"
            id="form2Example2"
            className="form-control"
            placeholder="password"
            value={password}
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />

          <button className="createAccountBtn" onClick={handleLogin}>
            Create Account
          </button>

          <div className="asking">
            <h5 style={{ margin: "0px", fontSize: "1rem" }}>{ask}</h5>
            <span className="logsignInswtich">Login here</span>
          </div>

          <div className="divider">
            <div className="line"></div>
            <div
              className="text"
              style={{
                color: "#b9b3b3",
                fontWeight: "600",
                fontSize: "0.8rem",
              }}
            >
              or
            </div>
            <div className="line"></div>
          </div>

          <div className="googleFacebook">
            <button class="google-btn googleFacebookbtn">
              <img
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                alt="Google logo"
              />
              Sign up with Google
            </button>
            <button class="facebook-btn googleFacebookbtn">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook logo"
              />
              Sign up with Facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
