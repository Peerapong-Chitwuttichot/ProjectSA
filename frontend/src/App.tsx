import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import ProfileOperator from "./pages/profile/operator";
import RegisterOperator from './pages/register/operator';
import LoginOperator from "./pages/login/operator";
import PrivacyOperator from "./pages/privacy/operator";


const App: React.FC = () => {
  const token = localStorage.getItem("accessToken");
  const result = localStorage.getItem("result");
  const page = localStorage.getItem("page");

  if (token) {
    console.log(result)
    if (result === "operator") {
      return (
        <Router>
          <Routes>
            <Route path="/login/operator" element={<Navigate to="/profile/operator" />} />
            <Route path="/profile/operator" element={<ProfileOperator />} />
            <Route path="/privacy/operator" element={<PrivacyOperator />} />
          </Routes>
        </Router>
      );
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginOperator />} />
        <Route path="/register/operator" element={<RegisterOperator />} />
        <Route path="/profile/operator" element={<Navigate to="/" />} />
        <Route path="/privacy/operator" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );


};


export default App;
