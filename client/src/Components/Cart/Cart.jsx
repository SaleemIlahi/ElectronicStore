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
    }, [items])

    const removeCart = (id) => {
        cartDispatch({ type: 'REMOVE_FROM_CART', playload: id })
    }

    let rupeeIndian = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      });

    return (
        <div className='shop-container'>
            <Navbar />
            <Container>
                {
                    total > 0 ?
                        <>
                            <h1>Shopping Cart</h1>
                            <Row>
                                <Col sm={9}>
                                    <Table>
                                        <tbody>
                                            {
                                                items.map((item) => (
                                                    <tr key={item.id}>
                                                        <th><img src={item.img} alt="cart_item" /></th>
                                                        <td><p>{item.title}</p></td>
                                                        <th><p>{rupeeIndian.format(total)}</p></th>
                                                        <th onClick={() => removeCart(item.id)}><BsFillTrashFill /></th>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col sm={3} className="text-center">
                                    <h5>Total Items: {totalItem}</h5>
                                    <h5>Total Amount: {rupeeIndian.format(total)}</h5>
                                    <Link to='/shipping'>
                                        <Button>Checkout</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </>

                        :

                        <>
                            <h1>Empty Cart</h1>
                            <Row>
                                <Col sm={12}>
                                    <img src="https://res.cloudinary.com/do63p55lo/image/upload/v1651081625/ElectonicStore/logo/empty_cart_cj0byl.svg" alt="empty-cart" className="empty-cart" />
                                </Col>
                            </Row>
                        </>
                }

            </Container>
        </div>
    )
}

export default Cart