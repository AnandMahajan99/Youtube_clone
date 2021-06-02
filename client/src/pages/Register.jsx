import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import apis from "./../api";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const data = { email, password };
      apis.register(data).then((res) => {
        if (res.data.status === "success") {
          console.log("Register Success");
          alert("Register Success");
          // window.location("/login");
          history.push("/login");
        }
      });
    } else {
      alert("password and confirm password are not equal");
    }
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
          <h3 className="text-center">Register</h3>
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
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <small>Password and Confirm Password must be same</small>
            </Form.Group>
            <Button style={{ width: "100%" }} type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
