import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Feed from "./page/feed/feed";
import Opsearch from './page/opsearch/opsearch';

function App() {
  return (
    // <div className='hi'>Hi</div>
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/opsearch" element={<Opsearch />} />
      </Routes>
    </Router>
  );
}

export default App;
