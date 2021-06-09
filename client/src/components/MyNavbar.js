import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import { SidebarData } from "./SidebarData";
// import "./Navbar.css";
import { IconContext } from "react-icons";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Container,
  Image,
} from "react-bootstrap";


function MyNavbar(props) {
  // const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <IconContext.Provider value={{ color: "fff" }}>
        <Navbar expanded={expanded} expand="lg" bg="dark" variant="dark">
          <Container>
            <Image src="logo32x32.png" alt="Brand Image" />
            <Navbar.Brand href="#" className="mr-auto">| You-Tube</Navbar.Brand>
            <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
              <Nav className="m-2">
                <NavLink to="/" style={{ textDecoration: 'none', color: "#fff"}} onClick={() => setExpanded(false)}>Home</NavLink>
                {/* <NavLink href="/">Subscriptions</NavLink> */}
              </Nav>
              <Nav className="ml-auto">
                <NavDropdown title="Account" id="collasible-nav-dropdown" className="m-2"> 
                  <NavDropdown.Item>
                  <NavLink to="/profile" style={{ textDecoration: 'none', color: '#212529'}} onClick={() => setExpanded(false)}>
                    Edit Profile
                  </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <NavLink to='/channel' style={{ textDecoration: 'none', color: '#212529'}} onClick={() => setExpanded(false)}>
                    My Channel
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>

                  <NavLink to="/register">
                <Button variant="outline-info" className="m-2" onClick={() => setExpanded(false)}>
                    Register
                </Button>
                  </NavLink>
                  <NavLink to="/login">
                <Button variant="outline-info" className="m-2" onClick={() => setExpanded(false)}>
                    Login
                </Button>
                  </NavLink>
                  <NavLink to="/logout">
                <Button variant="outline-info" className="m-2" href="/logout" onClick={() => setExpanded(false)}>
                  Logout
                </Button>
                </NavLink>
                <NavLink to="/channel/new">
                <Button
                  variant="outline-info"
                  className="m-2"
                  href="/channel/new"
                  onClick={() => setExpanded(false)}
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
