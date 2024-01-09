import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




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
    <Form>
    <Form.Group className="mb-3" controlId="loginCorreo">
      <Form.Label>Correo</Form.Label>
      <Form.Control type="email" onChange={loginChange} value={loginRock.correoRock}  placeholder="Ingrese su correo" name='correoRock'/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="loginPass">
      <Form.Label>Contraseña</Form.Label>
      <Form.Control type="password"  onChange={loginChange} value={loginRock.passRock} placeholder="Ingrese una contraseña" name='passRock' />
    </Form.Group>

    <Button onClick={loginRockUser} variant="primary" type="submit">
      Iniciar Sesion
    </Button>
  </Form>
  </>
  )
}

export default LoginPage