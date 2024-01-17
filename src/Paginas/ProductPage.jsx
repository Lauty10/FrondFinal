import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosUrl from '../helps/axiosBase';
import NavbarC from '../Componentes/NavbarC';
import { Col, Container, Row } from 'react-bootstrap';

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
       
  return (
    <>
    <NavbarC/>
    <Container>
        <Row>
            <Col>
            {
           <h1 className='text-center mt-5 title-info'>{productos.Nombre}</h1>
            }
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default ProductPage