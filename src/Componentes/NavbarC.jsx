import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../Css/NavbarC.css"


const NavbarC = () => {
  return (
    <Navbar expand="lg" className="color-nav">
      <Navbar.Brand href="#home" className='text-style'>Full Rock</Navbar.Brand>
      <Navbar.Toggle className='color-button' aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home" className='text-style'>Inicio</Nav.Link>
          <Nav.Link href="#link" className='text-style'>Sobre nosotros</Nav.Link>
          <Nav.Link href="#link" className='text-style'>Contacto</Nav.Link>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  )
}

export default NavbarC