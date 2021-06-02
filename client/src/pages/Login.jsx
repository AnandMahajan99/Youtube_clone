import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import apis from "./../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { email, password };
    apis
      .login(data)
      .then((res) => {
        if (res.data.status === "success") {
          // console.log("Login Success");
          alert("Login Success");
          Cookies.set("user", res.data.data._id);
          Cookies.set("email", res.data.data.email);
          window.location = "/";
        } else {
          console.log(res.status.data);
        }
      })
      .catch((err) => {
        alert(err.response);
      });
  };

  return (
    <Container>
      <Row>
        <Col lg={4} md={3} xs={1}></Col>
        <Col
          lg={4}
          md={6}
          xs={10}
          style={{
            border: "2px solid grey",
            padding: "50px",
            borderRadius: "5px",
            marginTop: "50px",
            marginRight: "5px",
            marginLeft: "5px",
          }}
        >
          <h3 className="text-center">Login</h3>
          <hr style={{ borderTop: "2px solid grey" }}></hr>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Id"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Button style={{ width: "100%" }} type="submit">
              Login
            </Button>
            <br></br>
            <Link className="mt-2" to="/register">
              Create New Account
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
