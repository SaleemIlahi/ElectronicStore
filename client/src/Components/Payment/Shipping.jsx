import React, { useContext, useState, useEffect } from 'react'
import { cartContext } from '../../Context/CartContext.jsx'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
    const { cartState: { items } } = useContext(cartContext)
    const [total, setTotal] = useState()
    const navigate = useNavigate()

    const userData = {
        name: '',
        tel: '',
        address: '',
        city: '',
        pincode: ''
    }

    const [user, setUser] = useState(userData)

    const handleChange = e => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value })

        document.querySelector('span').innerHTML = ""
    }

    useEffect(() => {
        setTotal(items.reduce((acc, curr) => acc + Number(curr.price), 0))
    }, [items])

    const onSubmit = e => {
        e.preventDefault()
        if (user.name === "") {
            document.querySelector('span').innerHTML = "*Fill the Name Field"
        } else if (user.tel === "") {
            document.querySelector('span').innerHTML = "*Fill the Name Field"
            if (!user.tel.match(/^[0-9]{10}$/)) {
                document.querySelector('span').innerHTML = "*Enter a valid mobile number"
            }
        }else if(user.address === ""){
            document.querySelector('span').innerHTML = "*Fill the Address Field"
        }else if(user.city === ""){
            document.querySelector('span').innerHTML = "*Fill the City Field"
        }else if(user.pincode === ""){
            document.querySelector('span').innerHTML = "*Fill the Pincode Field"
            if (!user.pincode.match(/^[0-9]{6}$/)) {
                document.querySelector('span').innerHTML = "*Enter a valid Pincode"
            }
        }else{
            navigate('/checkout',{
                state: total
            })
        }
    }

    return (
        <form className="shipping_container mt-4">
            <h1>Shipping Address</h1>
            <span className='text-danger text-center fs-6'></span>
            <div className="ship-form">
                <label>Name</label>
                <input type="text" name="name" value={user.name} onChange={handleChange} />
            </div>
            <div className="ship-form">
                <label>Mobile No.</label>
                <input type="tel" name="tel" value={user.tel} onChange={handleChange} />
            </div>
            <div className="ship-form">
                <label>Address</label>
                <input type="text" name="address" value={user.address} onChange={handleChange} />
            </div>
            <div className="ship-form">
                <label>City</label>
                <input type="text" name="city" value={user.city} onChange={handleChange} />
            </div>
            <div className="ship-form">
                <label>Pincode</label>
                <input type="number" name="pincode" value={user.pincode} onChange={handleChange} />
            </div>
            <input className="submitButton" type="submit" onClick={onSubmit} />
        </form>
    );
}

export default Shipping
