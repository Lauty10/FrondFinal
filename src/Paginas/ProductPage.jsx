import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosUrl from '../helps/axiosBase';
import NavbarC from '../Componentes/NavbarC';
import { Col, Container, Row } from 'react-bootstrap';
import Figure from 'react-bootstrap/Figure';
import Accordion from 'react-bootstrap/Accordion';
import "../Css/ProductPage.css"
import FooterC from '../Componentes/FooterC';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2'
import Aero from "../Images/aero.jpg"
import Queen from "../Images/QueenBand.jpg"

const ProductPage = () => {
    const token=sessionStorage.getItem("token")
    const params=useParams();
    const[productos,setProductos]=useState({})

    const getProductoRock=async()=>{
        const oneProducto=await axiosUrl.get(`/productos/${params.id}`)
        setProductos(oneProducto.data.getAllProductsOne)
    }
    useEffect(()=>{
        getProductoRock()
       },[])

       useEffect(()=>{
       console.log(productos)
       },[productos])

const favoriteProduct=()=>{
  if (!token) {
    Swal.fire({
      title: "Debes Iniciar Sesion!",
      text: "AeroSmith una de la bandas mas emblematicas de los 80/90",
      imageUrl: Aero,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
    setTimeout(()=>{
      location.href=("/login")
    },3000)
  }
}

const carrProduct=()=>{
  if (!token) {
    Swal.fire({
      title: "Debes Iniciar Sesion!",
      text: "Queen una de la bandas mas grandes del mundo entero",
      imageUrl: Queen,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
    setTimeout(()=>{
      location.href=("/login")
    },3000)
  }
}
       
  return (
    <>
    <div className='fond-rock'>
    <NavbarC/>
    <Container>
    {[
       'danger'
      ].map((variant) => (
        <Alert className='mt-4' key={variant} variant={variant}>
          Gracias por ver nuestro producto!
        </Alert>
      ))}
       {[
       'success'
      ].map((variant) => (
        <Alert className='mt-4' key={variant} variant={variant}>
          El producto ya casi es tuyo!
        </Alert>
      ))}
        <Row>
            <Col sm={"12"} md={"6"} lg={"6"}>
            {
            <Figure >
            <Figure.Image className='mt-5 d-flex justify-content-center aling-items-center'
              width={450}
              height={550}
              alt="171x180"
              src={productos.Imagen}/>
            <Figure.Caption>
              <p className='style-leyend'>Tienda Full Rock</p>
            </Figure.Caption>
          </Figure>
            }
            </Col>
            <Col sm={"12"} md={"6"} lg={"6"}>
              <div className='sty'>
            <Accordion className='style-acd'   defaultActiveKey={null}>
            <Accordion.Item eventKey="0">
            <Accordion.Header className='mt-5 style-acorddion-two'>Nombre de Producto</Accordion.Header>
            <Accordion.Body className='rock-info'>
                {
                    productos.Nombre

                }
           </Accordion.Body>
           </Accordion.Item>
          <Accordion.Item eventKey="1">
          <Accordion.Header  className='style-acorddion'>Descripcion</Accordion.Header>
          <Accordion.Body  className='rock-info'>
          {
                    productos.Descripcion

                }
         </Accordion.Body>
         </Accordion.Item>
         <Accordion.Item eventKey="2">
          <Accordion.Header  className=' style-acorddion'>Precio</Accordion.Header>
          <Accordion.Body  className='rock-info'>
          {
                    productos.Precio

                }
         </Accordion.Body>
         </Accordion.Item>
         <Accordion.Item eventKey="3">
          <Accordion.Header  className=' style-acorddion'>Marca</Accordion.Header>
          <Accordion.Body  className='rock-info'>
          {
                   productos.Marca

                }
         </Accordion.Body>
         </Accordion.Item>
         </Accordion>
         </div>
         <div className='my-5 d-flex justify-content-center aling-items-center'>
         <Button variant="success" onClick={favoriteProduct}>Añadir a favoritos</Button>{' '}
         <Button variant="danger mx-2" onClick={carrProduct}>Añadir al carrito</Button>{' '}
         </div>
            </Col>
        </Row>
    </Container>
    <FooterC/>
    </div>
    </>
  )
}

export default ProductPage