
import { createContext, useReducer } from 'react'
import './App.css';
import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Resend from './Components/Resend/Resend.jsx'
import Verify from './Components/Verification/Verify.jsx';
import ProductPage from './Components/productPage/productPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {reducer} from './Reducer/authReducer.js'

export const context = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, null)
  return (
    <context.Provider value={{state,dispatch}}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="resend" element={<Resend />} />
            </Route>
            <Route path="product" element={<ProductPage />} />
            <Route path="verifyEmail/:token/:expireToken/:name" element={<Verify />} />
          </Routes>
        </Router>
      </div>
    </context.Provider>
  );
}

export default App;
