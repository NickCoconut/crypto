import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <form>
        <h3>Sign In</h3>

        <label>Email address</label>
        <input type="email" placeholder="Enter email" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />
        <br />
        <br />
        <button type="submit" className="buttonSolid">
          Submit
        </button>
      </form>
    );
  }
}
