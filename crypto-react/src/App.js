import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import axios from "axios";

import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar, Login, Register } from './components';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '???'
    })
    .then(res => {
      ''
    })
    .catch(err => console.log(err));
  }, [])

  return (
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Routes>
            <Route path="/" element={<Homepage />} />   
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
        Final project, Tofik and Yiyang.<br />
          <Link to="/">
            Crypto Currency
          </Link> <br />
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
    </div>
  </div>
)};


