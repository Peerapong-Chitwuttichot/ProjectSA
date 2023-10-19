
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

import { Layout} from "antd";

import CandidateSelection from "./pages/operator/candidateSelection";
import TestNotification from "./pages/customer/TestNotification";




const App: React.FC = () => {



  return (
    
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        
        <Routes>
                
                <Route path="/operator/CandidateSelection" element={<CandidateSelection />} />
                <Route path="/customer/TestNotification" element={<TestNotification />} /> 
                 
              </Routes>

      </Layout>
    </Router>
  );
};

export default App;