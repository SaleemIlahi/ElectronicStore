import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import { Container, Col, Row } from "react-bootstrap"
import Navbar from "../Navbar/Navbar.jsx";
import Rows from "../Row/Row.jsx";
import "./page.css"
import { cartContext } from '../../Context/CartContext.jsx'

const ProductPage = () => {
  const { cartDispatch } = useContext(cartContext)
  const location = useLocation()

  const productDetail = location.state

  const handleClick = (e) => {
    const imgURL = e.target.src
    const img = document.querySelector('.product-img img')
    img.src = imgURL
  }

  const addToCart = () => {
    cartDispatch({ type: 'ADD_TO_CART', cartItem: { id: productDetail._id, title: productDetail.title, img: productDetail.url[0], price: productDetail.price } })
  }

  return (
    <>
      <Navbar />
      <Container className="text-black">
        {
          productDetail && (
            <Row>
              <Col md="5">
                <div className="product">
                  <div className="product-img mb-3">
                    <img className="mt-3" src={productDetail.url[0]} alt="img" />
                  </div>
                  <div className="product-btn">
                    <Link to="/cart" onClick={addToCart}>
                      <button>
                        Add to Cart
                      </button>
                    </Link>
                    <button>Buy Now</button>
                  </div>
                </div>
              </Col>
              <Col md="7 mt-5">
                <div className="product-details">
                  <h3>{productDetail.title}</h3>
                  {
                    productDetail.url.map((img, i) => {
                      return (
                        <img src={img} key={i} alt="product" className="border border-dark mx-1 p-1" onClick={handleClick} />
                      )
                    })
                  }
                  <h6>M.R.P: {productDetail.price}</h6>

                  <div className="border border-black spec">
                    <h4>Specfication</h4>
                    <ul>
                      {
                        productDetail.description.split('. ').map((a, i) => {
                          return (
                            <li key={i}>{a}</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          )
        }
      </Container>
      {productDetail && <Rows title="Recommended" ctg={productDetail.category} skp={5} />}
    </>
  )
}

export default ProductPage
