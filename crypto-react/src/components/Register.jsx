import React, { Component } from "react";
export default class SignUp extends Component {
  render() {
    return (
      <form>
        <h3>Sign Up</h3>

        <label>First name</label>
        <input type="text" placeholder="First name" />

        <label>Last name</label>
        <input type="text" placeholder="Last name" />

        <label>Email address</label>
        <input type="email" placeholder="Enter email" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />
        <br />
        <br />
        <button type="submit">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
    );
  }
}
