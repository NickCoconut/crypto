import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);

    axios
      .post("http://localhost:3001/users/Register", { formDetails })
      .then((resp) => {
        if (resp.data.signedUp) {
          navigate("/login");
        }
      });
  };

  return (
    <div className="login">
    <div className="log">
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>User name</label>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={formDetails.username}
        onChange={handleChange}
      />

      <label>Email address</label>
      <input
        type="email"
        placeholder="Enter email"
        name="email"
        value={formDetails.email}
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        name="password"
        value={formDetails.password}
        onChange={handleChange}
      />
      <br />
      <br />
      <button className="buttonClass" type="submit">Sign Up</button>
      <p className="forgot-password text-right">
        Already registered <a href="/login">sign in?</a>
      </p>
    </form>
    </div>
  </div>
  );
};

export default SignUp;
