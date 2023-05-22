import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Verify = () => {
  const [verified, setVerified] = useState({});

  const isverified = verified.errorStatus;

  const { token, expireToken, name } = useParams();

  useEffect(() => {
    const Api = async () => {
      const verifyEmail = await fetch(
        `https://electronicstore.onrender.com/api/v1/verify-email/${token}/${expireToken}`
      );

      const response = await verifyEmail.json();
      setVerified(response);

      console.log(response);
    };

    Api();
  });

  return (
    <Container
      fluid
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card
        style={{
          width: "60%",
          height: "300px",
          background: "#52AB98",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Card.Body className="mt-5">
          <Card.Title>{name}</Card.Title>
          <Card.Text
            className="mx-auto p-4 fs-4 fw-bold"
            style={{ width: "350px", background: "#fff", color: "#52AB98" }}
          >
            {isverified ? verified.message : verified.message}
          </Card.Text>
          {isverified ? (
            <Link to="/login" className="text-white fs-5" replace>
              Login
            </Link>
          ) : (
            <div>You cannot login without verify your Email</div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Verify;
