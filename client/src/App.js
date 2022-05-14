import { useContext } from 'react'
import './App.css';
import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Resend from './Components/Resend/Resend.jsx'
import Verify from './Components/Verification/Verify.jsx';
import ProductPage from './Components/productPage/productPage.jsx';
import Cart from './Components/Cart/Cart.jsx'
import Payment from './Components/Payment/Payment.jsx'
import SearchProduct from './Components/SearchProduct/SerachProduct.jsx';
import Success from './Components/Payment/Success.jsx'
import Shipping from './Components/Payment/Shipping.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { context } from './Context/Context.jsx'

function App() {  
  const { state } = useContext(context) 

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="login" element={state ? <Navigate to='/' replace /> : <Login />} />
              <Route path="register" element={state ? <Navigate to='/' replace /> : <Register />} />
              <Route path="resend" element={state ? <Navigate to='/' replace /> : <Resend />} />
            </Route>
            <Route path="product/:inm/:ictg" element={<ProductPage />} />
            <Route path="verifyEmail/:token/:expireToken" element={<Verify />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={state ? <Payment /> : <Navigate to='/login' />} />
            <Route path='/search' element={<SearchProduct />} />
            <Route path='/success' element={<Success />} />
            <Route path='/shipping' element={state ? <Shipping /> : <Navigate to='/login' />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
