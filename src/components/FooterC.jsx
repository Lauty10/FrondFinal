import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from "../Images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import QR from "../Images/QR-DATA.jpg";
import { Link } from 'react-router-dom';
import "../Css/Footer.css";

const FooterC = () => {
  return (
    <Container fluid className='footer-color'>
      <Row>
        <Col sm={12} md={3} lg={3} className='text-center'>
        <Link to="/error">
        <img className='footer-style mt-4' src={Logo} alt="Logo-Rock" />
        </Link>
        </Col>
        <Col sm={12} md={3} lg={3} className='d-flex mt-5 mx-auto flex-column text-center text-md-start'>
        <Link to="/Error" className='me-4 tienda-style rock-tienda'>Tienda, Rock Full</Link>
        <Link to="/Error" className='tienda-style'>Provincia de Buenos Aires, Argentina</Link>
        </Col>
        <Col sm={12} md={3} lg={3} className='d-flex mt-4 mx-auto align-items-center flex-column text-center text-md-start'>
          <a href="https://www.linkedin.com/in/lautaro-maldonado-168b1a263/"><FontAwesomeIcon icon={faLinkedin} beat size="3x" style={{color: "#6600ff"}} /></a>
          <a href="https://api.whatsapp.com/send?phone=91123877300" className='my-2 tienda-style contact-style wsp-style'>Click para contactarme!!</a>
          <img className='qr-style' src={QR} alt="QR-Data" />
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col sm={12} md={12} lg={12} className='text-center'>
          <p className='tienda-style copy-style mb-2'>©2024 Store  Full Rock. Todos los derechos reservados.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default FooterC;
