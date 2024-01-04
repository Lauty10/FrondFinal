import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../Css/NavbarC.css"


const NavbarC = () => {
  return (
    <Navbar expand="lg" className="color-nav">
      <Navbar.Brand href="#home" className='text-rock'>Full Rock</Navbar.Brand>
      <Navbar.Toggle className='color-button' aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home" className='text-rock'>Inicio</Nav.Link>
          <Nav.Link href="#link" className='text-rock'>Sobre nosotros</Nav.Link>
          <Nav.Link href="#link" className='text-rock'>Contacto</Nav.Link>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  )
}

export default NavbarC