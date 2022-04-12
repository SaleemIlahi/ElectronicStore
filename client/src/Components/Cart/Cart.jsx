import React, { useContext, useState, useEffect } from 'react'
import { cartContext } from '../../Context/CartContext.jsx'
import { Container, Table } from 'react-bootstrap'
import { BsFillTrashFill } from 'react-icons/bs'
import Navbar from '../Navbar/Navbar.jsx'

function Cart() {
    const { cartState: { items, totalItem }, cartDispatch } = useContext(cartContext)
    const [total, setTotal] = useState()

    console.log(items)
    useEffect(() => {
        setTotal(items.reduce((acc, curr) => acc + Number(curr.price), 0))
    })

    const removeCart = (id) => {
        cartDispatch({ type: 'REMOVE_FROM_CART', playload: id })
    }

    return (
        <Container fluid>
            <Navbar />
            <Container>
                <h1>Shopping Cart</h1>
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

                <h3 className='text-end'>Total Items: {totalItem}</h3>
                <h3 className='text-end'>Total Amount: M.R.P {total}</h3>
            </Container>
        </Container>
    )
}

export default Cart