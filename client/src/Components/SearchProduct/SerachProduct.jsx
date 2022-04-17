import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { useLocation, Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'

const SerachProduct = () => {

    const location = useLocation()

    console.log(location.state)

    return (
        <Container fluid>
            <Navbar />
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly"
            }}>
                {
                    location.state.map((item, i) => {
                        return (
                            <Link to={`/product/${item.title}/${item.category}`} state={item} key={i} className="my-3">
                                <Card>
                                    <Card.Img variant='top' src={item.url[0]} />
                                </Card>
                            </Link>
                        )
                    })
                }
            </div>
        </Container>
    )
}

export default SerachProduct