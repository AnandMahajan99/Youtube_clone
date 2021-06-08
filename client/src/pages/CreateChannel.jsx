import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import apis from "../api";

function CreateChannel() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = Cookies.get("user");
    // console.log(user);
    const data = { name, description, user };
    apis
      .createChannel(data)
      .then((res) => {
        if (res.data.status === "success") {
          alert("Success");
          window.location = "/channel";
        } else {
          // console.log(res.data.data);
        }
      })
      .catch((err) => console.log(err.response));
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
          <h3 className="text-center">Create New Channel</h3>
          <hr style={{ borderTop: "2px solid grey" }}></hr>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter Description"
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" style={{ width: "100%" }} type="submit">
              Create Channel
            </Button>
            <br></br>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateChannel;
