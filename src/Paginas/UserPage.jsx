import React, { useEffect, useState } from 'react';
import NavbarC from '../Componentes/NavbarC';
import FooterC from '../Componentes/FooterC';
import "../Css/UserPage.css";
import { Col, Container, Row } from 'react-bootstrap';
import axiosUrl from '../helps/axiosBase';
import CardB from '../Componentes/CardB';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const UserPage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const bodyTwo = document.querySelector('.body-two');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPosition = Math.min(scrollTop * 0.3, 50);
      bodyTwo.style.transform = `translateX(${scrollPosition}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bodyTwo = document.querySelector('.body-three');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPosition = Math.min(scrollTop * 0.3, 50);
      bodyTwo.style.transform = `translateX(-${scrollPosition}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bodyTwo = document.querySelector('.body-for');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPosition = Math.min(scrollTop * 0.3, 50);
      bodyTwo.style.transform = `translateX(${scrollPosition}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const bodyTwo = document.querySelector('.body-five');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPosition = Math.min(scrollTop * 0.3, 50);
      bodyTwo.style.transform = `translateX(-${scrollPosition}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

const[catalogue,setCatalogue]=useState([])

const catalogueAll=async()=>{
  const allRockCatalogue= await axiosUrl.get("/productos")
  setCatalogue(allRockCatalogue.data.getAllProducts)
}

useEffect(()=>{
catalogueAll()
},[])

useEffect(()=>{
  console.log(catalogue)
  },[catalogue])

  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);


  return (
    <>
      <NavbarC />
      <div className='body-one'>
        <div className='text-center mt-5 title-font'>Tienda FullRock</div>
      </div>
      <div className='body-two'>Bienvenido a Full Rock la mejor tienda de moda y Rock</div>
      <div className='body-three d-flex justify-content-end'>En nuestra tienda podrás encontrar lo mejor</div>
      <div className='body-for'>Si eres apasionado por el Rock, este es tu lugar</div>
      <div className='body-five d-flex justify-content-end'>Esperamos que disfrutes de Full Rock</div>
      <div>
     <div className='mt-4'>
     <div className='my-5 text-center'>
  <Button className='custom-button mx-auto'
    onClick={() => setOpen(!open)}
    aria-controls="example-collapse-text"
    aria-expanded={open}>
    Sobre nuestros productos {' '}
    {open ? <span>&#9660;</span> : <span>&#9654;</span>}
  </Button>
  <Collapse in={open}>
    <div id="example-collapse-text" className="info-container">
      Lo que hace que FullRock sea único es que todos nuestros productos son diseñados con creatividad y cuidado por nuestro talentoso equipo interno. No solo seguimos las últimas tendencias de la moda rock, sino que también creamos diseños originales que encontrarás exclusivamente en nuestra tienda. En FullRock, entendemos que la autenticidad es clave. Por eso, nos esforzamos por ofrecerte productos que no solo son elegantes y de alta calidad, sino también verdaderamente únicos. Cada pieza cuenta una historia y se convierte en una extensión de tu identidad rockera.
    </div>
  </Collapse>
</div>
<div className='my-5 text-center'>
  <Button className='custom-button mx-auto'
    onClick={() => setOpenTwo(!openTwo)}
    aria-controls="example-collapse-text"
    aria-expanded={open}>
    Garantias y metodos de pago {' '}
    {openTwo ? <span>&#9660;</span> : <span>&#9654;</span>}
  </Button>
  <Collapse in={openTwo}>
    <div id="example-collapse-text" className="info-container">
    En Full Rock, aceptamos Mercado Pago para proporcionarte una forma segura y eficiente de realizar tus compras. Con Mercado Pago, puedes elegir entre diversas opciones, como tarjetas de crédito, débito, transferencias bancarias y otros métodos disponibles. Así, garantizamos un proceso de pago fácil y accesible para todos nuestros clientes.Para aquellos que prefieren el pago en efectivo, también aceptamos esta opción en nuestras tiendas físicas. Al realizar tu compra, podrás optar por pagar en efectivo al recibir tus productos. Esto brinda flexibilidad y comodidad, adaptándonos a tus preferencias de pago.Cada prenda que adquieras en Full Rock está respaldada por una garantía de 1 semana. Esto significa que tienes un período de tiempo considerable para evaluar tu compra y asegurarte de que cumple con todas tus expectativas.
    </div>
  </Collapse>
</div>
</div>
 </div>
 <div className='style-container'>
<Container>
  <Row>
    {catalogue.map((info) => (
      <Col className='my-2 d-flex justify-content-center aling-items-center' sm={"12"} md={"4"} lg={"4"} key={info._id}>
        <CardB titleCatalogue={info.Nombre} imgCatalogue={info.Imagen} contentCatalogue={info.Descripcion} />
      </Col>
    ))}
  </Row>
</Container>
      <FooterC />
      </div>
    </>
  );
};

export default UserPage;
