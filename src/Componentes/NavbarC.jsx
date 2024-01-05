import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import logoImage from '../Images/Logo.jpg';
import '../Css/NavbarC.css';

const NavbarC = () => {
  const [barra, setBarra] = useState(false);

  const toggleSearch = () => {
    setBarra(!barra);
  };

  return (
    <>
      <Navbar expand="lg" className="color-nav">
        <Navbar.Brand href="#home" className='text-rock'><img className='img-logo' src={logoImage} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle className='color-button' aria-controls="basic-navbar-nav" onClick={toggleSearch} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='text-rock'>Inicio</Nav.Link>
            <Nav.Link href="#link" className='text-rock'>Sobre nosotros</Nav.Link>
            <Nav.Link href="#link" className='text-rock'>Contacto</Nav.Link>
          </Nav>
          {barra && (
            <FormControl
              type="text"
              placeholder="Buscar producto"
              className="mr-sm-2"
            />
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarC;
