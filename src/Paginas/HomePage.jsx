import React, { useEffect, useState } from 'react'
import "../Css/Homepage.css"
import CarruselC from '../Componentes/CarruselC'
import axiosUrl from '../helps/axiosBase'
import SliderC from '../Componentes/SliderC'
import "../Css/NavbarC.css"
import NavbarC from '../Componentes/NavbarC'




const HomePage = () => {
  const [productos,setProductos]=useState([])

  const allGetProductos=async()=>{
 try {
  const rockProducts= await axiosUrl.get("/productos")
  setProductos(rockProducts.data.getAllProducts)

 } catch (error) {
  console.log("ERROR AL ENCONTRAR PRODUCTOS",error)
 }
  }

  useEffect(()=>{
   allGetProductos()
  },[])

  useEffect(()=>{
    console.log(productos)
  },[productos])


  return (
  <>
  <h1 className='h2-homepage'>Tienda Full Rock</h1>
  <NavbarC/>
  <div className='contenedor-carrosuel'>
  <CarruselC/>
  </div>
  <div className='contenedor-carrosuel'>
        {productos.length > 0 ? (
          <SliderC productos={productos} />
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
  </>
  )
}

export default HomePage