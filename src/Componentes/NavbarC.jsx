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

  const singOut = () => {
    // Implementa la lógica para cerrar sesión
    // Puede ser un llamado a tu API o limpiar la sessionStorage
    console.log('Cerrar sesión...');
  };

  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const role = JSON.parse(sessionStorage.getItem("role")) || "";

  return (
    <>
      <Navbar expand="lg" className="color-nav">
        <Navbar.Brand href="#home" className='text-rock'><img className='img-logo' src={logoImage} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle className='color-button' aria-controls="basic-navbar-nav" onClick={toggleSearch} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className='style-control'>
              {barra && (
                <FormControl
                  type="text"
                  placeholder="Busca en nuestra tienda.."
                />
              )}
            </div>
            <Nav.Link href="/" className='text-rock'>Inicio</Nav.Link>
            <Nav.Link href="/" className='text-rock'>Sobre nosotros</Nav.Link>
            <Nav.Link href="/" className='text-rock'>Contacto</Nav.Link>
          </Nav>
          {token && role ? (
            <Nav className='ms-auto me-1'>
              <Nav.Link href="/#" className='data-name style-font'>Cerrar Sesion</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto me-2">
              <Nav.Link href="/register" className='text-rock'>Registrarse</Nav.Link>
              <Nav.Link href="/login" className='text-rock'>Iniciar Sesion</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarC;
