import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom"; // react-router-dom의 Link 컴포넌트 임포트
import './navi.css'

function Navi() {
  return (
          <Navbar bg="light" expand="lg" className="nav-head">
              <Navbar.Brand href="#home">Home</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <Nav.Link href="#home">Sign In</Nav.Link>
                      <NavDropdown title="Example" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Ablum</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Pricing</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
                  <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                      <Button variant="outline-success">Search</Button>
                  </Form>
              </Navbar.Collapse>
          </Navbar>

  );
}
export default Navi;
reportWebVitals();
