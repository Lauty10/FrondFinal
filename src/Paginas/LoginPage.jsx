import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarC from '../Componentes/NavbarC';
import "../Css/LoginPage.css"
import Swal from 'sweetalert2'
import Redondos from "../Images/REDONDOS.jpg"
import FooterC from '../Componentes/FooterC';
import axiosUrl, { headboard } from '../helps/axiosBase';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
     const navigate=useNavigate()
     const [loginRock,setLoginRock]=useState({
        correoRock:"",
        passRock:""
    })

    const loginChange=(ev)=>{
        setLoginRock({...loginRock,[ev.target.name]:ev.target.value})
    }

    const loginRockUser= async (ev)=>{
          ev.preventDefault()
      try {
        const userLogin= await axiosUrl.post("/usuarios/login",{
          Correo:loginRock.correoRock,
          Contrasenia:loginRock.passRock
         },headboard)
         if (userLogin.data.Role==="user") {
           sessionStorage.setItem("token",JSON.stringify(userLogin.data.token))
           sessionStorage.setItem("role",JSON.stringify(userLogin.data.Role))
           sessionStorage.setItem("idUsuario",JSON.stringify(userLogin.data.idUsuario))
           Swal.fire({
             title: "Iniciando Sesion...",
             text: "Los redondos una de las bandas mas convocantes de Argentina",
             imageUrl: Redondos,
             imageWidth: 400,
             imageHeight: 200,
           });
           setTimeout(()=>{
             navigate("/user")
           },3000)
         }else{
           sessionStorage.setItem("token",JSON.stringify(userLogin.data.token))
           sessionStorage.setItem("role",JSON.stringify(userLogin.data.Role))
           sessionStorage.setItem("idUsuario",JSON.stringify(userLogin.data.idUsuario))
           Swal.fire({
             icon: "success",
             title: "Bienvenido Administrador",
             text: "Iniciando sesion...",
           });
           setTimeout(()=>{
             navigate("/admin")
           },3000)
         }  
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Por favor, intentalo nuevamente",
        });
      }
    }


  return (
    <>
    <div className='login-fondo'>
    <NavbarC/>
    <div className='d-flex justify-content-center mt-5'>
    <Form className='mt-5 style-form'>
      <h2 className='h2-rock-login'>Iniciar Sesion</h2>
    <Form.Group className="mb-3" controlId="loginCorreo">
      <Form.Label className='text-style-login' >Correo</Form.Label>
      <Form.Control type="email" onChange={loginChange} value={loginRock.correoRock}  placeholder="Ingrese su correo" name='correoRock'/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="loginPass">
      <Form.Label className='text-style-login'>Contraseña</Form.Label>
      <Form.Control type="password"  onChange={loginChange} value={loginRock.passRock} placeholder="Ingrese una contraseña" name='passRock' />
    </Form.Group>

    <Button className='button-style mt-5 mx-auto w-75' onClick={loginRockUser} variant="danger" type="submit">
      Iniciar Sesion
    </Button>
  </Form>
  </div>
  </div>
  <FooterC/>
  </>
  )
}

export default LoginPage