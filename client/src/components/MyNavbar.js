import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
// import "./Navbar.css";
import { IconContext } from "react-icons";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Image,
} from "react-bootstrap";

function MyNavbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "fff" }}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Image src="logo32x32.png" alt="Brand Image" />
            <Navbar.Brand href="/">| You-Tube</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#pricing">Subscriptions</Nav.Link>
              </Nav>

              {/* <Form inline className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-info" className="m-2">
                  Search
                </Button>
              </Form> */}

              <Nav className="">
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Edit Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/channel">
                    My Channel
                  </NavDropdown.Item>
                  
                </NavDropdown>
                
                <Button variant="outline-info" className="" href="/login">
                  Login
                </Button>
                <Button variant="outline-info" className="ml-2" href="/logout">
                  Logout
                </Button>
                <Button variant="outline-info" className="ml-2" href="/channel/new">
                  Create Channel
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </IconContext.Provider>
    </>
  );
}

export default MyNavbar;
