import React from 'react'
import { Navbar, Nav, Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import { BsFillCartFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import './navbar.css'

const AppNavbar = () => {
    return (
        <Navbar className='navbar p-0'>
            <Container fluid>
                <Navbar.Brand>
                    <img src="https://res.cloudinary.com/do63p55lo/image/upload/v1642435427/ElectonicStore/logo/logo_vmcz7e.png" alt="logo" />
                    <span className='d-block'>ElectronicStore.</span>
                </Navbar.Brand>
                <InputGroup className='input-group'>
                    <FormControl placeholder="Search product" className='search-input' />
                    <Button className='search-btn'>Search</Button>
                </InputGroup>
                <Nav>
                    <Link className='btn-link btn-login fw-bold text-decoration-none rounded mx-3 d-flex justify-content-center align-items-center' to='/login'>
                        Login
                    </Link>
                    <Link to="/cart" className='btn-link btn-cart fw-bold text-decoration-none rounded d-flex justify-content-center align-items-center'>
                        <BsFillCartFill className='fs-5 text-white mx-1' />
                        Cart
                        <div className='cart-count mx-1 d-none'>0</div>
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default AppNavbar