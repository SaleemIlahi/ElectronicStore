import Navbar from '../Navbar/Navbar.jsx';
import {Outlet} from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Home