import { Carousel } from 'react-bootstrap'
import './slider.css'

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/do63p55lo/image/upload/v1647170989/ElectonicStore/productImage/banner/banner3_jflxbz.png"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/do63p55lo/image/upload/v1647170989/ElectonicStore/productImage/banner/banner2_rtbli8.png"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/do63p55lo/image/upload/v1647170989/ElectonicStore/productImage/banner/banner1_wmljfv.png"
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/do63p55lo/image/upload/v1647862557/ElectonicStore/productImage/banner/banner4_udonof.png"
                    alt="fourth slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default Slider