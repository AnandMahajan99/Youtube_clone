import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import * as GoIcons from "react-icons/go";
import apis from "./../api";

function ChannelPage() {
  const [data, setData] = useState([]);
  const [channel, setChannel] = useState({});
  const { id } = useParams();

  function getDifferenceInDays(date1, date2) {
    let d = new Date(date2).getTime();
    const diffInMs = Math.abs(d - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + " days ago";
  }

  useEffect(() => {
    apis.getAllVideosOfChannel(id).then((res) => {
      setData(res.data.data);
      // console.log(res.data.data);
    });
    apis.getChannel(id).then((res) => {
      setChannel(res.data.data);
    });
  }, [id]);

  return (
    <Container fluid>
      <Row style={{ alignItems: "center" }}>
        {data.map((item) => (
          <Col xl={3} lg={4} sm={6} xs={12} className="mt-4" key={item._id}>
            <Link
              to={"/video/" + item._id}
              style={{
                textDecoration: "none",
                color: "#212529",
                marginBottom: "8px",
              }}
            >
              <Card style={{ width: "20rem", border: "none" }}>
                <Card.Img
                  variant="top"
                  // src="https://source.unsplash.com/user/erondu/720x404"
                  src={"/" + item.thumbnail}
                />
                <Card.Body>
                  <Row>
                    <Col xs={2}>
                      <Image
                        style={{ padding: "0px" }}
                        src="https://source.unsplash.com/user/erondu/40x40"
                        roundedCircle
                      />
                    </Col>
                    <Col xs={10}>
                      <Card.Title style={{ fontSize: "1.0rem" }}>
                        <p className="card-text">{item.title}</p>
                      </Card.Title>
                      <Card.Text>
                        {channel.name}
                        <br />
                        <small className="text-muted">
                          {item.viewCount} views <GoIcons.GoPrimitiveDot />
                          {getDifferenceInDays(Date.now(), item.uploadOn)}
                        </small>
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ChannelPage;
