import React, { useContext,useState,useEffect } from 'react'
import { Navbar, Nav, Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import { BsFillCartFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import './navbar.css'
import { context } from '../../App.js'

const AppNavbar = () => {
    const { dispatch } = useContext(context)
    const [auth, setAuth] = useState()

    const logout = async () => {
        const response = await fetch('/api/v1/logout');
        const data = await response.json()
        dispatch({ type: 'logout', payload: data.success })
    }

    const Auth = async() => {
        const response = await fetch('/api/v1/auth');
        const data = await response.json()

        if(data.success){
            setAuth(data)
        }else{
            setAuth(data.success)
        }
    }

    useEffect(() => {
        Auth()
    })
    

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
                    {
                        auth ?
                            <>
                                <div className="avatar">
                                    {auth.name.slice(0,1)}
                                </div>
                                <div className='btn-link btn-login fw-bold text-decoration-none rounded mx-3 d-flex justify-content-center align-items-center' style={{cursor: 'pointer'}} onClick={logout}>
                                    logout
                                </div>
                            </>
                            :
                            <Link className='btn-link btn-login fw-bold text-decoration-none rounded mx-3 d-flex justify-content-center align-items-center' to='/login'>
                                Login
                            </Link>
                    }
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