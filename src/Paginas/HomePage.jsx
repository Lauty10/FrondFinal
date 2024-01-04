import React, { useEffect, useState } from 'react'
import "../Css/Homepage.css"
import NavbarC from '../Componentes/NavbarC'
import CarruselC from '../Componentes/CarruselC'
import axiosUrl from '../helps/axiosBase'




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
  <p className='h2-homepage'>Bienvenidos a Full Rock</p>
  <NavbarC/>
  <div className='contenedor-carrosuel'>
  <CarruselC/>
  </div>
  </>
  )
}

export default HomePage