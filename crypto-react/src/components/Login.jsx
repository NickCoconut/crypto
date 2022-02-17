import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formDetails, setFormDetails] = useState({
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
      .post("http://localhost:3001/api/users/login", { formDetails })
      .then((resp) => console.log("resp", resp));
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>

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
      <button type="submit" className="buttonSolid">
        Submit
      </button>
    </form>
  );
};

export default Login;