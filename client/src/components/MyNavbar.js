import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
                <NavLink to="/">Home</NavLink>
                {/* <NavLink href="/">Subscriptions</NavLink> */}
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
                  <NavDropdown.Item href="#action/3.1">
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <NavLink to='/channel'>
                    My Channel
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>

                  <NavLink to="/login">
                <Button variant="outline-info" className="">
                    Login
                </Button>
                  </NavLink>
                  <NavLink to="/logout">
                <Button variant="outline-info" className="ml-2" href="/logout">
                  Logout
                </Button>
                </NavLink>
                <NavLink to="/channel/new">
                <Button
                  variant="outline-info"
                  className="ml-2"
                  href="/channel/new"
                >
                  Create Channel
                </Button>
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </IconContext.Provider>
    </>
  );
}

export default MyNavbar;
