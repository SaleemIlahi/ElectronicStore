import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Context from './Context/Context.jsx'
import CartContext from './Context/CartContext.jsx'

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <CartContext>
        <App />
      </CartContext>
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);
