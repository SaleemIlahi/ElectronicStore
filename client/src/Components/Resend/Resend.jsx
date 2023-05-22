import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

function Resend() {
  const location = useLocation();

  const userData = {
    email: location.state.userEmail,
    otp: "",
    password: "",
  };

  const [user, setUser] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        "https://electronicstore.onrender.com/api/v1/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (!data.success) throw data;

      setUser(userData);
      alert(data.message);
    } catch (error) {
      errorHandler(error);
    }
  };

  const errorHandler = (data) => {
    const formInput = document.querySelectorAll(".form-input");
    console.log(data);
    const text = data.message.replace(/"/g, "");
    const targetInputText = text.split(" ")[0].toLowerCase();
    formInput.forEach((Input) => {
      if (targetInputText === Input.name) {
        Input.classList.add("redBorder");
        Input.parentElement.querySelector("span").innerHTML = `${text}`;
      }
    });
  };

  return (
    <Container fluid className="form-container">
      <Row className="form-box">
        <Link to="/">
          <BsXLg className="x-icon" />
        </Link>

        <Col className="form-left-box" lg={5}>
          <img
            src="https://res.cloudinary.com/do63p55lo/image/upload/v1642435427/ElectonicStore/logo/logo_vmcz7e.png"
            alt="login-logo"
          />
          <div className="form-text">
            <h6 className="px-3">
              Get access to your Orders, Wishlist and Recommendations
            </h6>
          </div>
        </Col>

        <Col className="form-right-box" lg={7}>
          <Form onSubmit={handleClick}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-input bg-transparent px-0 py-2"
              />
              <span className="text-danger"></span>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={user.otp}
                onChange={handleChange}
                className="form-input bg-transparent px-0 py-2"
              />
              <span className="text-danger"></span>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-input bg-transparent px-0 py-2"
              />
              <span className="text-danger"></span>
            </Form.Group>
            <ButtonGroup className="d-flex flex-column">
              <Button className="button mb-3" type="submit">
                Change Password
              </Button>
              <Button className="button" type="button">
                Resend OTP
              </Button>
            </ButtonGroup>

            <div className="nav-links d-flex justify-content-between">
              <Link to="/login" className="cursor-pointer text-primary">
                Back to Login
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Resend;
