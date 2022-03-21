import Navbar from '../Navbar/Navbar.jsx';
import Slider from '../Slider/Slider.jsx';
import Row from '../Row/Row.jsx';
import {Outlet} from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Navbar />
            <Slider />
            <Row title="Mobile Phones" ctg="Mobile" />
            <Row title="Laptop" ctg="Laptop" />
            <Outlet />
        </>
    )
}

export default Home