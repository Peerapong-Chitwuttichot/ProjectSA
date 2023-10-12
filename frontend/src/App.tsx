import React, { useState } from "react";
import type { MenuProps } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

import { Layout} from "antd";

import CandidateSelection from "./pages/operator/candidateSelection";


type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const App: React.FC = () => {

  return (
    
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        
        <Routes>
                
                <Route path="/operator/CandidateSelection" element={<CandidateSelection />} />
                {/* <Route path="/customer/feed" element={<Feed />} /> */}
              </Routes>

      </Layout>
    </Router>
  );
};

export default App;