import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router";
>>>>>>> master

axios.defaults.withCredentials = true;

const Login = () => {
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> master
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
<<<<<<< HEAD
  const [loginStatus, setLoginStatus] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/users/login")
    .then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].id)
      }
    })
  }, [])
=======
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/users/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].id);
      }
    });
  }, []);
>>>>>>> master

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);

    axios
      .post("http://localhost:3001/users/login", { formDetails })
<<<<<<< HEAD
      .then((resp) => {console.log("resp", resp)});
      
=======
      .then((resp) => {
        if (resp.data.loggedIn) {
          console.log(resp.data.loggedIn); 
          navigate("/");
        }
      });
>>>>>>> master
  };
  return (
    <div className="login">
      <div className="log">
<<<<<<< HEAD

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
      <button type="submit" className="buttonClass">
        Submit
      </button>
    </form>
      </div>

=======
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
          <button type="submit" className="buttonClass">
            Submit
          </button>
        </form>
      </div>
>>>>>>> master
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> master
