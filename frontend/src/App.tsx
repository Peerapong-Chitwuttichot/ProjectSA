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

import CustomerCreate from "./pages/customer/create";
import RegisterOparetor from "./pages/register/oparetor";
import LoginOparetor from "./pages/login/oparetor";

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
        <Route path="/register/oparetor" element={<RegisterOparetor />} />
        <Route path="/login/oparetor" element={<LoginOparetor />} />
      </Routes>
    </Router>
  );
};

export default App;
