import './App.css';
import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Resend from './Components/Resend/Resend.jsx'
import Verify from './Components/Verification/Verify.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="resend" element={<Resend />} />
          </Route>
          <Route path="verifyEmail/:token/:expireToken/:name" element={<Verify />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
