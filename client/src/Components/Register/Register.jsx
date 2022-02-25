import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { BsXLg } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Register() {

    const userData = {
        name: '',
        email: '',
        password: ''
    }

    const [user, setUser] = useState(userData)

    const handleChange = e => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value })

        e.target.classList.remove('redBorder')
        e.target.parentElement.querySelector('span').innerHTML = ''
    }

    const handleClick = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch('/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const data = await response.json()

            if (!data.success) throw data

            setUser(userData)
            alert(data.message)

        } catch (error) {
            errorHandler(error)
        }
    }

    const errorHandler = (data) => {
        const formInput = document.querySelectorAll('.form-input')
        const text = data.message.replace(/"/g, '')
        const targetInputText = text.split(' ')[0].toLowerCase()
        formInput.forEach(Input => {
            if (targetInputText === Input.name) {
                Input.classList.add('redBorder')
                Input.parentElement.querySelector('span').innerHTML = `${text}`
            }
        })
    }

    return (
        <Container fluid className='form-container'>
            <Row className='form-box'>
                <Link to="/">
                    <BsXLg className='x-icon' />
                </Link>

                <Col className='form-left-box' lg={5}>
                    <img src='https://res.cloudinary.com/do63p55lo/image/upload/v1642435427/ElectonicStore/logo/logo_vmcz7e.png' alt="login-logo" />
                    <div className="form-text">
                        <h6 className='px-3'>Get access to your Orders, Wishlist and Recommendations</h6>
                    </div>
                </Col>

                <Col className='form-right-box' lg={7}>
                    <Form onSubmit={handleClick}>
                        <Form.Group className="mb-5">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" name='name' value={user.name} onChange={handleChange} className='form-input bg-transparent px-0 py-2' />
                            <span className='text-danger'></span>
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" name='email' value={user.email} onChange={handleChange} className='form-input bg-transparent px-0 py-2' />
                            <span className='text-danger'></span>
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" name='password' value={user.password} onChange={handleChange} className='form-input bg-transparent px-0 py-2' />
                            <span className='text-danger'></span>
                        </Form.Group>
                        <Button className='form-btn' type="submit">
                            Create Account
                        </Button>
                    </Form>

                    <div className="nav-links d-flex justify-content-between">
                        <Link to='/login' className='cursor-pointer text-primary'>Exiting User? Login</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;
