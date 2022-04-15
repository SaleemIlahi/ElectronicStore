import React, { useContext, useState, useEffect } from 'react'
import { cartContext } from '../../Context/CartContext.jsx'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import { BsFillTrashFill } from 'react-icons/bs'
import Navbar from '../Navbar/Navbar.jsx'
import { Link } from 'react-router-dom'


function Cart() {
    const { cartState: { items, totalItem }, cartDispatch } = useContext(cartContext)
    const [total, setTotal] = useState()

    useEffect(() => {
        setTotal(items.reduce((acc, curr) => acc + Number(curr.price), 0))
    },[items])

    const removeCart = (id) => {
        cartDispatch({ type: 'REMOVE_FROM_CART', playload: id })
    }

    return (
        <div className='shop-container'>
            <Navbar />
            <Container>
                <h1>Shopping Cart</h1>
                <Row>
                    <Col sm={9}>
                        <Table>
                            <tbody>
                                {
                                    items.map((item) => (
                                        <tr key={item.id} className="text-center">
                                            <th><img src={item.img} alt="cart_item" /></th>
                                            <th><p>{item.title}</p></th>
                                            <th><p>{item.price}</p></th>
                                            <th onClick={() => removeCart(item.id)}><BsFillTrashFill /></th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm={3} className="text-center">
                        <h5>Total Items: {totalItem}</h5>
                        <h5>Total Amount: M.R.P {total}</h5>
                        <Link to='/checkout' state={total}>
                            <Button>Checkout</Button>
                        </Link>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Cart