import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarC from '../components/NavbarC';
import Swal from 'sweetalert2'
import Redondos from "../Images/REDONDOS.jpg";
import FooterC from '../components/FooterC';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import axiosUrl from '../helps/axiosBase';
import "../Css/LoginPage.css"

const LoginPage = () => {
  const navigate = useNavigate()
  const [loginRock, setLoginRock] = useState({
    correoRock: "",
    passRock: ""
  })

  const loginChange = (ev) => {
    setLoginRock({ ...loginRock, [ev.target.name]: ev.target.value })
  }

  const loginRockUser = async (ev) => {
    ev.preventDefault()
    try {
      const userLogin = await axiosUrl.post("/usuarios/login", {
        Correo: loginRock.correoRock,
        Contrasenia: loginRock.passRock
      })
      if (userLogin.data.Role === "user") {
        sessionStorage.setItem("token", JSON.stringify(userLogin.data.token))
        sessionStorage.setItem("role", JSON.stringify(userLogin.data.Role))
        sessionStorage.setItem("idUsuario", JSON.stringify(userLogin.data.idUsuario))
        Swal.fire({
          title: "Iniciando Sesion...",
          text: "Los redondos una de las bandas mas convocantes de Argentina",
          imageUrl: Redondos,
          imageWidth: 400,
          imageHeight: 200,
        });
        setTimeout(() => {
          navigate("/user")
        }, 3000)
      } else {
        sessionStorage.setItem("token", JSON.stringify(userLogin.data.token))
        sessionStorage.setItem("role", JSON.stringify(userLogin.data.Role))
        sessionStorage.setItem("idUsuario", JSON.stringify(userLogin.data.idUsuario))
        Swal.fire({
          icon: "success",
          title: "Bienvenido Administrador",
          text: "Iniciando sesion...",
        });
        setTimeout(() => {
          navigate("/admin")
        }, 3000)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Por favor, intentalo nuevamente",
      });
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newpass, setNewPass] = useState({
    Nombre:'',
    Nacionalidad:'',
    Correo: '',
    Contrasenia: '',
    ContraseniaR: ''
  })

  const handlePass = (ev) => {
    setNewPass({ ...newpass, [ev.target.name]: ev.target.value })
  }

  const newPassRock = async (ev) => {
    ev.preventDefault()
    try {
      if (newpass.Contrasenia === newpass.ContraseniaR) {
        const passRockNew = await axiosUrl.put(`/usuarios/pass`, {
          Nombre:newpass.Nombre,
          Correo: newpass.Correo,
          Contrasenia: newpass.Contrasenia,
        })
        if (passRockNew.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Contraseña restablecida",
            text: "Gracias por visitar FullRock",
          });
        }
      }
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido.";
  

      if (error.response && error.response.data && error.response.data.mensaje) {
  
        errorMessage = error.response.data.mensaje;
        
      } else if (error.request) {
  
        errorMessage = "La solicitud fue realizada pero no se recibió respuesta del servidor.";
      } else {
  
        errorMessage = error.message || "Error al realizar la solicitud.";
      }
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    }
  }

  useEffect(() => {
    const LoginRockColor = document.getElementById('LoginRockColor');
    const PassRockColor = document.getElementById('PassRockColor');

    const ColorRedLogin = (ev) => {
      if (ev.target.value === '') {
        ev.target.classList.add('red-color-style')
      } else {
        ev.target.classList.remove('red-color-style')
      }

    }

    const ColorRedPass = (ev) => {
      if (ev.target.value === '') {
        ev.target.classList.add('red-color-style')
      } else {
        ev.target.classList.remove('red-color-style')
      }

    }

    LoginRockColor.addEventListener('input', ColorRedLogin);
    PassRockColor.addEventListener('input', ColorRedPass)

  }, [])

  return (
    <>
      <div className='login-fondo'>
        <NavbarC />
        <div className='d-flex justify-content-center my-5'>
          <Form className='style-form'>
            <h2 className='h2-rock-login'>Iniciar Sesion</h2>
            <Form.Group className="mb-3" >
              <Form.Label className='text-style-login' >Correo</Form.Label>
              <Form.Control id='LoginRockColor' type="email" onChange={loginChange} value={loginRock.correoRock} placeholder="Ingrese su correo" name='correoRock' />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className='text-style-login'>Contraseña</Form.Label>
              <Form.Control id='PassRockColor' type="password" onChange={loginChange} value={loginRock.passRock} placeholder="Ingrese una contraseña" name='passRock' />
            </Form.Group>

            <div className='d-flex justify-content-center'>
              <Button className='pass-rock' onClick={handleShow}>
                Olvidaste tu clave? Restablecer clave
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Recuperar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>

                  <Form.Group className="mb-3">
                      <Form.Label>Ingrese su Nombre</Form.Label>
                      <Form.Control type="text" placeholder="Ingrese su nombre de registro" name='Nombre' value={newpass.Nombre} onChange={handlePass} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Ingrese su email</Form.Label>
                      <Form.Control type="email" placeholder="Ingrese su email" name='Correo' value={newpass.Correo} onChange={handlePass} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Ingrese la nueva contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Ingrese la clave" name='Contrasenia' value={newpass.Contrasenia} onChange={handlePass} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Repetir la contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Ingrese la nueva clave" name='ContraseniaR' value={newpass.ContraseniaR} onChange={handlePass} />
                    </Form.Group>

                    <Button variant="danger" type="submit" onClick={newPassRock}>
                      Actualizar contraseña
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>

            <Button id='sessionLogin' className='button-style mt-4 mb-5 mx-auto w-75' onClick={loginRockUser} variant="danger" type="submit">
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
