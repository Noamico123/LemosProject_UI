import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/lemos_logo.jpg';

export class NavBar extends Component {
  render() {
    return (
        <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/dashboard">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            />{' '}Lemos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/customer">Manage Data</Nav.Link>
            <Nav.Link href="/settings">LoadByKey</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

export default NavBar