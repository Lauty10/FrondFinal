import React, { useEffect, useState } from 'react'
import axiosUrl from '../helps/axiosBase'
import NavbarC from '../Componentes/NavbarC'
import { Col, Container, Row } from 'react-bootstrap';
import FooterC from '../Componentes/FooterC';
import "../Css/Fav.css"
import CardC from '../Componentes/CardC';

const FavPage = () => {
    const[productFav,setProductFav]=useState([])
    const getFavRock=async()=>{
        const rockFav= await axiosUrl.get("/fav")
        setProductFav(rockFav.data.getAllFav[0].favoritos)
    }

useEffect(()=>{
    getFavRock()
},[])

useEffect(()=>{
    console.log(productFav)
},[productFav])


  return (
    <>
    <div className='body-stone'>
    <NavbarC/>
    <Container className='my-5'>
        <Row>
        {productFav.map((data)=>(
            <Col className='my-5' sm={"12"} md={"4"} lg={"4"} key={data._id}>
           <CardC imageUrl={data.Imagen} idPage='favPage'/>
            </Col>
           ))}
        </Row>
    </Container>
    <FooterC/>
    </div>
    </>
  )
}

export default FavPage