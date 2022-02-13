import React, { Component } from "react";
export default class SignUp extends Component {
  render() {
    return (
      <form>
        <h3>Sign Up</h3>

        <label>First name</label>
        <input type="text" className="form-control" placeholder="First name" />

        <label>Last name</label>
        <input type="text" className="form-control" placeholder="Last name" />

        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
        />

        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
        <br />
        <br />
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
    );
  }
}
