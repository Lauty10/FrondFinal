import React from 'react'
import "../Css/Homepage.css"
import NavbarC from '../Componentes/NavbarC'
import CarruselC from '../Componentes/CarruselC'



const HomePage = () => {
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