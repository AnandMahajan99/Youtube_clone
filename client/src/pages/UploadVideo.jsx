import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import apis from "./../api/index";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState("");
  const [video, setVideo] = useState("");
  const myVid = useRef(null);

  const changeTitle = (event) => setTitle(event.target.value);
  const changeDescription = (event) => setDescription(event.target.value);
  const changeFile = async (event) => {
    await setFile(event.target.files[0]);
    await setVideo(URL.createObjectURL(event.target.files[0]));
  };
  const { id } = useParams();

  // useEffect(() => {
  //   var i = setInterval(function () {
  //     if (myVid.current.readyState > 0) {
  //       var minutes = parseInt(myVid.current.duration / 60, 10);
  //       var seconds = myVid.current.duration % 60;
  //       setDuration(minutes + "." + Math.floor(seconds));
  //       clearInterval(i);
  //     }
  //   }, 200);
  // }, [video]);

  const submitForm = async (event) => {
    event.preventDefault();
    if (title === "" || description === "" || file === ""){
      return window.alert("Please fill all the fields");
    } else {
      // console.log(parseInt(myVid.current.duration / 60, 10));
      // if (myVid.current.readyState > 0) {
        var minutes = parseInt(myVid.current.duration / 60, 10);
        var seconds = myVid.current.duration % 60;
        await setDuration(minutes + "." + Math.floor(seconds));
      // }
  
      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
  
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("duration", duration);
      // console.log(Cookies.get("user"));
      formData.append("channel", id);
      formData.append("user", Cookies.get("user"));
      console.log(duration);
      apis
        .uploadVideo(formData, config)
        .then((res) => {
          if (res.data.status === "success") {
            alert("Success");
            // console.log(res);
          } else {
            // alert("Failed to save data");
            alert(res.data.data);
          }
        })
        .catch((err) => {
          alert(err);
          console.log(err.res);
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="mt-4 border border-dark p-4">
          <h2 className="text-center mt-4">Upload Video</h2>
          <hr></hr>
          <Form onSubmit={submitForm}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={changeTitle}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                onChange={changeDescription}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                id="Files"
                label="Example file input"
                name="file"
                onChange={changeFile}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <audio ref={myVid} id="vid" src={video}></audio>
      </Row>
    </Container>
  );
}

export default Upload;
