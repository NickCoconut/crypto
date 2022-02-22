import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  UserAddOutlined,
  HomeOutlined,
  ExclamationCircleOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  LoginOutlined,
  StarOutlined,
} from "@ant-design/icons";

import icon from "../images/cryptocurrency.png";
import axios from "axios";

const Navbar = () => {
  
  //Post Logout
  function logout() {
    axios.post("http://localhost:3001/users/logout").then((resp) => {
      console.log(resp.data);
    });
  }

  function loggedinuser() { //Returns navbar with Home, News, Favorites, Logout
    return (
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="logo logo-text">
            <Link to="/" className="a">
              Crypto
            </Link>
          </Typography.Title>
          <Button
            className="menu-control-container"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <MenuOutlined />
          </Button>
        </div>
        {activeMenu && (
          <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/" onClick={() => home()}>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>

            <Menu.Item icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Item icon={<StarOutlined />}>
              <Link to="/mylikes">Favorites</Link>
            </Menu.Item>
            <Menu.Item icon={<ExclamationCircleOutlined />}>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    );
  }
  function loggedoutuser() { //Returns navbar with Home, News, Login, Register
    return (
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="logo logo-text">
            <Link to="/" className="a">
              Crypto
            </Link>
          </Typography.Title>
          <Button
            className="menu-control-container"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <MenuOutlined />
          </Button>
        </div>
        {activeMenu && (
          <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/" onClick={() => home()}>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>

            <Menu.Item icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Item icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item icon={<UserAddOutlined />}>
              <Link to="/register">Register</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    );
  }

  
  
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  //Loggedin checker from the back end, returns true or false after checking if theres a session
  let loggedIn =  axios.post("http://localhost:3001/users/").then((resp) => {
    return resp.data.loggedIn;
  })

  return loggedoutuser();//renders a logged out user nav bar
  //return loggedinuser(); //renders a logged in user nav bar
};

export default Navbar;
