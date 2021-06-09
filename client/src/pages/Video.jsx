import React, { useEffect, useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import apis from "./../api";

function Video() {
  const [data, setData] = useState({
    channel: { name: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    apis
      .getVideo(id)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div
      style={{
        margin: "35px auto",
        maxWidth: "650px",
        lineHeight: "1.6",
        fontSize: "18px",
        fontFamily: "Courier New, Courier, monospace",
        color: "#444",
        padding: "0 10px",
      }}
    >
      {/* <Container fluid> */}
      {isLoading && (
        <>
          <h2>HTTP Video Streaming</h2>
          <div className="mt-4">
            <video width="800" controls muted="" loop autoPlay>
              <source
                // src={"http://localhost:8080/" + data.video}
                src={"/api/v1/video/stream/" + data._id}
                type="video/mp4"
              />
            </video>
          </div>
          <h2>{data.title}</h2>
          <h3>Upload By: {data.channel.name}</h3>
          <h3>Upload On: {data.uploadOn}</h3>
          <p>{data.description}</p>
        </>
      )}
      {/* </Container> */}
    </div>
  );
}

export default Video;
