import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import apis from "../api";
import Cookies from "js-cookie";
import { Button, Container, Table } from "react-bootstrap";

function MyChannels() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apis.getAllChannel(Cookies.get("user")).then((res) => {
      setData(res.data.data);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete channel"))
      apis
        .deleteChannel(id)
        .then((res) => {
          if (res.data.status === "success") {
            alert("Channel deleted successfully");
            window.location.reload();
          } else console.log(res.data.data);
        })
        .catch((err) => console.log(err.response));
  };

  return (
    <Container>
      <h2 className="text-center mt-4">My Channels</h2>
      <Table>
        <thead>
          <tr>
            <th>Channel</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id + "0"}>
              <td key={item._id + "1"}>{item.name}</td>
              <td key={item._id + "2"}>
                <NavLink to={"/admin/video/channel/" + item._id}><Button>View</Button></NavLink>
              </td>
              <td key={item._id + "3"}>
                <NavLink to={"/upload/" + item._id}><Button>Upload</Button></NavLink>
              </td>
              <td key={item._id + "4"}>
                <Button variant="danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default MyChannels;
