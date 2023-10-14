import React, { useState } from "react";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";


import ProfileUser from "./pages/profile/user";
import RegisterUser from "./pages/register/user";
import LoginUser from "./pages/login/user";


const App: React.FC = () => {
  const token = localStorage.getItem("accessToken");
  const page = localStorage.getItem("page");

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };
  // const navigate = useNavigate();

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  // const setCurrentPage = (val: string) => {
  //   localStorage.setItem("page", val);
  // };;

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/profile/user" element={<Navigate to="/" />} />
          <Route path="/" element={<LoginUser />} />
          {/* <Route element={<Navigate to="/login/user" />} /> */}
          <Route path="/register/user" element={<RegisterUser />} />
        </Routes>
      </Router>
    )

  }

  return (
    // <Router>
    //   <Routes>
    //     {token ? (
    //       // ถ้ามี Token
    //       <>
    //         <BrowserRouter>
    //           {/* <Route path="/login/user" element={<Navigate to="/profile/user" />} /> */}
    //           <Route path="/profile/user" element={<ProfileUser />} />
    //         </BrowserRouter>

    //       </>
    //     ) : (
    //       // ถ้าไม่มี Token
    //       <>
    //         <Route path="/profile/user" element={<Navigate to="/" />} />
    //         <Route path="/" element={<LoginUser />} />
    //         {/* <Route element={<Navigate to="/login/user" />} /> */}
    //         <Route path="/register/user" element={<RegisterUser />} />
    //       </>
    //     )}
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        {/* {token ? (
          <Route path="/login/user" element={<LoginUser />} />
        ) : (
          // ไม่มี Token ให้แสดงหน้า LoginUser โดยตรง
          <LoginUser />
        )} */}
        <Route path="/register/user" element={<RegisterUser />} />
        <Route path="/login/user" element={<LoginUser />} />
        <Route path="/profile/user" element={<ProfileUser />} />
      </Routes>
    </Router>
  );
};

// const RoutesComponent: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login/user" element={<LoginUser />} />
//       </Routes>
//     </Router>
//   );
// };

export default App;
