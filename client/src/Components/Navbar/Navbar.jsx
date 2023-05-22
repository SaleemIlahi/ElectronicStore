import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { BsFillCartFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { context } from "../../Context/Context.jsx";
import { cartContext } from "../../Context/CartContext.jsx";

const AppNavbar = () => {
  const { state, dispatch } = useContext(context);
  const {
    cartState: { totalItem },
  } = useContext(cartContext);

  const navigate = useNavigate();
  const [search, setSearch] = useState();

  const handleSearch = async () => {
    const response = await fetch(
      `https://electronicstore.onrender.com/api/v1/search?q=${search}`
    );
    const data = await response.json();

    if (data.product.length === 0) {
      console.log("not data");
    } else {
      navigate("/search", {
        state: data.product,
      });
    }
  };

  const logout = async () => {
    const response = await fetch(
      "https://electronicstore.onrender.com/api/v1/logout"
    );
    await response.json();
    dispatch({ type: "logout", payload: false });
  };

  const Auth = async () => {
    const response = await fetch(
      "https://electronicstore.onrender.com/api/v1/auth"
    );
    const data = await response.json();
    if (data.success) {
      dispatch({ type: "login", payload: true });
    } else {
      dispatch({ type: "logout", payload: false });
    }
  };

  useEffect(() => {
    Auth();
  });

  return (
    <Navbar className="navbar p-0">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img
              src="https://res.cloudinary.com/do63p55lo/image/upload/v1642435427/ElectonicStore/logo/logo_vmcz7e.png"
              alt="logo"
            />
            <span className="d-block text-black">ElectronicStore.</span>
          </Link>
        </Navbar.Brand>
        <InputGroup className="input-group">
          <FormControl
            placeholder="Search product"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="search-btn" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
        <Nav>
          <Link
            to="/"
            className="btn-link btn-cart fw-bold text-decoration-none rounded d-flex justify-content-center align-items-center"
          >
            Home
          </Link>
          {state ? (
            <>
              <div
                className="btn-link btn-login fw-bold text-decoration-none rounded mx-3 d-flex justify-content-center align-items-center"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                logout
              </div>
            </>
          ) : (
            <Link
              className="btn-link btn-login fw-bold text-decoration-none rounded mx-3 d-flex justify-content-center align-items-center"
              to="/login"
            >
              Login
            </Link>
          )}
          <Link
            to="/cart"
            className="btn-link btn-cart fw-bold text-decoration-none rounded d-flex justify-content-center align-items-center"
          >
            <BsFillCartFill className="fs-5 text-white mx-1" />
            Cart
            <sup className="mx-1">{totalItem}</sup>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
