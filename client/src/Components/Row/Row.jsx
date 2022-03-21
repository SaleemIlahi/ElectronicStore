
import { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
import { Link } from "react-router-dom"
import './row.css'

const Row = (props) => {

    const [product, setProduct] = useState([])

    const handleClick = (e) => {
        const outerContainer = document.querySelector('.container-fluid')
        const innerContainer = document.querySelector(`#${props.ctg}`)

        const sliderWidth = outerContainer.offsetWidth -innerContainer.offsetWidth

        if (e.target.className === "card-next") {
            innerContainer.style.transform = `translateX(${sliderWidth}px)`
        } else if (e.target.className === "card-prev") {
            innerContainer.style.transform = 'translateX(0px)'
        }
    }


    useEffect(() => {
        let isMount = true

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/v1/getProductByCategory/${props.ctg}`)
                const data = await response.json()
                if(isMount){
                    setProduct(data.product)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()

        return () => { isMount = false };

    })

    return (
        <Container fluid className='my-4 cont'>
            <h2 className='text-black'>{props.title}</h2>
            <div className="card-container" id={props.ctg}>
                {
                    product.map((item, i) => {
                        return (
                            <Link to="/product" state={item} key={i}>
                                <Card>
                                    <Card.Img variant='top' src={item.url[0]} />
                                </Card>
                            </Link>
                        )
                    })
                }
            </div>



            <div className="card-prev" onClick={handleClick}>
                <BsChevronCompactLeft />
            </div>
            <div className="card-next" onClick={handleClick}>
                <BsChevronCompactRight />
            </div>
        </Container>
    )
}

export default Row