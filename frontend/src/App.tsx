import React, { useState } from "react";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "./assets/logo.png";


import Candidatepost from "./pages/candidate/post";
import Candidatehome from "./pages/candidatehome/home";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const page = localStorage.getItem("page");
  const [collapsed, setCollapsed] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // เพิ่มตัวแปร isRegistered

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };;

  return (
    <Router>
      <Routes>
        <Route path="/candidate/post" element={<Candidatepost />} />
        <Route path="/candidatehome/home" element={<Candidatehome />} />
      </Routes>
    </Router>
  );
};

export default App;
