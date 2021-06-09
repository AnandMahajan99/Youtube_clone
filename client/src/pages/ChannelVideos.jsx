// Only Admin can access

import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Button, Container, Table, Image } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai";
import apis from "../api";
// import Cookies from "js-cookie";

function ChannelVideos() {
  const [data, setData] = useState(null);
  const [channel, setChannel] = useState({});
  const { id } = useParams();

  useEffect(() => {
    apis.getAllVideosOfChannel(id).then((res) => {
      setData(res.data.data);
    });
    apis.getChannel(id).then((res) => {
      setChannel(res.data.data);
    });
  }, [id]);

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete video"))
      apis
        .deleteVideo(id)
        .then((res) => {
          if (res.data.status === "success") {
            window.alert("Channel deleted successfully");
            window.location.reload();
          } else {
            console.log(res.data.data);
          }
        })
        .catch((err) => console.log(err.response));
  };

  const TableData = () => {
    if (data != null && data.length > 0)
      return (
        <>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id + "0"}>
                <td>
                  <Image width="170px" src={"/" + item.thumbnail}></Image>
                </td>
                <td key={item._id + "1"}>{item.title}</td>
                <td key={item._id + "2"}>
                  <NavLink to={"/video/" + item._id}>
                  <Button variant="outline-primary">
                    View
                  </Button>
                  </NavLink>
                </td>
                <td key={item._id + "3"}>
                <NavLink to={"/update/" + item._id}>
                  <Button
                    variant="outline-success">
                    Update
                  </Button>
                  </NavLink>
                </td>
                <td key={item._id + "4"}>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      );
    else
      return (
        <>
          <h2 className="text-center mt-4">No Videos Available</h2>
          <div className="text-center mt-4" style={{ justifyContent: 'center'}}>
          <NavLink to={"/upload/" + channel._id}>
          <Button variant="outline-success" style={{ fontSize: '24px'}}>
            <AiOutlineCloudUpload size={100} color="" style={{}} /> <br/>Upload
          </Button>
          </NavLink>
          </div>
        </>
      );
  };

  return (
    <Container>
      <h1 className="text-center mt-4">{channel.name}</h1>
      <Table>
        <TableData />
      </Table>
    </Container>
  );
}

export default ChannelVideos;
