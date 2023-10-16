import React, {  } from "react";


import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


import ProfileOparator from "./pages/profile/oparator";
import PrivacyOparator from "./pages/privacy/oparator";
import RegisterOparator from './pages/register/oparator';
import LoginOparator from "./pages/login/oparator";


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
          {/* <Route path="/profile/oparator" element={<Navigate to="/" />} /> */}
          <Route path="/login/oparator" element={<LoginOparator />} />
          {/* <Route element={<Navigate to="/login/oparator" />} /> */}
          <Route path="/register/oparator" element={<RegisterOparator />} />
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
    //           {/* <Route path="/login/oparator" element={<Navigate to="/profile/oparator" />} /> */}
    //           <Route path="/profile/oparator" element={<ProfileOparator />} />
    //         </BrowserRouter>

    //       </>
    //     ) : (
    //       // ถ้าไม่มี Token
    //       <>
    //         <Route path="/profile/oparator" element={<Navigate to="/" />} />
    //         <Route path="/" element={<LoginOparator />} />
    //         {/* <Route element={<Navigate to="/login/oparator" />} /> */}
    //         <Route path="/register/oparator" element={<RegisterOparator />} />
    //       </>
    //     )}
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        {/* {token ? (
          <Route path="/login/oparator" element={<LoginOparator />} />
        ) : (
          // ไม่มี Token ให้แสดงหน้า LoginOparator โดยตรง
          <LoginOparator />
        )} */}
        <Route path="/register/oparator" element={<RegisterOparator />} />
        <Route path="/login/oparator" element={<LoginOparator />} />
        <Route path="/profile/oparator" element={<ProfileOparator />} />
        <Route path="/privacy/oparator" element={<PrivacyOparator />} />
      </Routes>
    </Router>
  );
};

// const RoutesComponent: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login/oparator" element={<LoginOparator />} />
//       </Routes>
//     </Router>
//   );
// };

export default App;
