import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarC from '../Componentes/NavbarC';
import "../Css/LoginPage.css"



const LoginPage = () => {

    const [loginRock,setLoginRock]=useState({
        correoRock:"",
        passRock:""
    })

    const loginChange=(ev)=>{
        setLoginRock({...loginRock,[ev.target.name]:ev.target.value})
    }

    const loginRockUser= async (ev)=>{
    ev.preventDefault()
    const userLogin= await fetch("http://localhost:3001/usuarios/login",{
        method:"POST",
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({
            Correo: loginRock.correoRock,
            Contrasenia:loginRock.passRock,
        }),
    })
    const date= await userLogin.json()
    console.log(date)
    
    }


  return (
    <>
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

    <Button className='button-style mx-auto w-75' onClick={loginRockUser} variant="danger" type="submit">
      Iniciar Sesion
    </Button>
  </Form>
  </div>
  </>
  )
}

export default LoginPage