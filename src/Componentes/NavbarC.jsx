import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import logoImage from '../Images/Logo.png';
import '../Css/NavbarC.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axiosUrl, { headboard } from '../helps/axiosBase';

const NavbarC = () => {
  const [barra, setBarra] = useState(false);

  const toggleSearch = () => {
    setBarra(!barra);
  };

  const sinOff=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("role")
    location.href="/"
  }

  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const role = JSON.parse(sessionStorage.getItem("role")) || "";
  const AdminPageProduct=window.location.pathname

  const[newProduct,setNewProduct]=useState({
    Nombre:"",
    Marca:"",
    Precio:"",
    Descripcion:""
  })

  const[imagen,setImagen]=useState({})

  const newChange=(ev)=>{
    setNewProduct({...newProduct,[ev.target.name]:ev.target.value})
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
  const handleShow = () =>{
    setShow(true);
  }

  const newChangeImagen=(ev)=>{
    console.log(ev)
    setImagen(ev.target.files[0]);

  }

  const newRockProduct= async(ev)=>{
   ev.preventDefault()
   try {
    const{Nombre,Marca,Precio,Descripcion}=newProduct
    if (!Nombre || !Marca ||! Precio ||!Descripcion|| !imagen) {
      alert("Por favor complete todos los campos!")
      return
    }else{
      const data= new FormData();
      data.append("Nombre",Nombre)
      data.append("Marca",Marca)
      data.append("Precio",Precio)
      data.append("Descripcion",Descripcion)
      data.append("Imagen",imagen)
      const createProductRock=await axiosUrl.post("/productos",data,headboard);
      console.log(createProductRock)
      if (createProductRock.status===200) {
        alert("Producto creado")
        window.location.reload()
      }
    }
   } catch (error) {
    console.log(error)
   }
  }

  const [newUser,setNewUser]=useState({
    Nombre:"",
    Correo:"",
    Nacionalidad:"",
    Role:"",
    Contrasenia:""
  })

  const userChange=(ev)=>{
    setNewUser({...newUser,[ev.target.name]:ev.target.value})
  }

const postUser=async(ev)=>{
ev.preventDefault()
try {
  const{Nombre,Nacionalidad,Role,Contrasenia,Correo}=newUser
  if (!Nombre||!Nacionalidad||!Role||!Contrasenia||!Correo) {
    alert("Completa todos los campos")
    return
  }else{
    const createUserRock=await axiosUrl.post("/usuarios",{
      Nombre:newUser.Nombre,
      Correo:newUser.Correo,
      Nacionalidad:newUser.Nacionalidad,
      Role:newUser.Role,
      Contrasenia:newUser.Contrasenia
    },headboard)
    if (createUserRock.status===200) {
      alert("Usuario creado")
      window.location.reload()
    }
  }
} catch (error) {
  console.log(error)
}
}


  return (
    <>
      <Navbar expand="lg" className="color-nav">
        <Navbar.Brand href="#home" className='text-rock'><img className='img-logo' src={logoImage} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle className='color-button' aria-controls="basic-navbar-nav" onClick={toggleSearch} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className='style-control'>
              {barra && (
                <FormControl
                  type="text"
                  placeholder="Busca en nuestra tienda.."
                />
              )}
            </div>
            <Nav.Link href="/" className='text-rock'>Inicio</Nav.Link>
            <Nav.Link href="/sobreNosotros" className='text-rock'>Sobre nosotros</Nav.Link>
            <Nav.Link href="#" className='text-rock'>Contacto</Nav.Link>
          {token && role==="user" ?(
              <>        
              <Nav.Link href="#" className='text-rock'>Favoritos</Nav.Link>
              <Nav.Link href="#" className='text-rock'>Carrito</Nav.Link>
              </>
          ):token && role==="admin" && AdminPageProduct=="/admin" ? (
            <>
            <Nav.Link href="/userAdmin" className='text-rock'>Usuarios</Nav.Link>        
           <Button className='button-product me-auto' variant="danger" onClick={handleShow}>
           Crear un producto
           </Button>

          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>

          <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingrese el nombre" value={newProduct.Nombre} name='Nombre' onChange={newChange} />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Marca</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la marca" value={newProduct.Marca} name='Marca'  onChange={newChange} />
          </Form.Group>

          
          <Form.Group className="mb-3">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la marca" value={newProduct.Descripcion} name='Descripcion'  onChange={newChange} />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" placeholder="Ingrese el precio" value={newProduct.Precio} name='Precio'  onChange={newChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" placeholder="Ingrese la URL" name='Imagen' onChange={newChangeImagen}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={newRockProduct}>
           Crear producto
          </Button>
          </Form>
          </Modal.Body>
          </Modal>
            </>
          ):token && role==="admin" && AdminPageProduct=="/userAdmin"?(
            <>
            <Nav.Link href="/admin" className='text-rock'>Productos</Nav.Link>        
            <Button  className='button-product me-auto'  onClick={handleShow}>
            Crear un usuario
            </Button>

           <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
           <Modal.Title >Crear usuario</Modal.Title>
           </Modal.Header>
           <Modal.Body>
           <Form>

           <Form.Group className="mb-3" controlId="formBasicEmail">
           <Form.Label>Nombre</Form.Label>
           <Form.Control type="text" placeholder="Ingresa el nombre" value={newUser.Nombre} name='Nombre' onChange={userChange} />
           </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="Ingresa el correo" value={newUser.Correo} name='Correo' onChange={userChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nacionalidad</Form.Label>
          <Form.Control type="text" placeholder="Ingresa la nacionalidad" value={newUser.Nacionalidad} name='Nacionalidad' onChange={userChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder="Ingresa el Role"  value={newUser.Role} name='Role' onChange={userChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingresa la contraseña"  value={newUser.Contrasenia} name='Contrasenia' onChange={userChange} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={postUser}>
           Crear usuario
          </Button>
          </Form>
           </Modal.Body>
           </Modal>
            </>
          ):null}
        </Nav>
          {token && role ? (
            <Nav className='ms-auto me-1'>
              <Nav.Link href="/#"  className='text-rock' onClick={sinOff}>Cerrar Sesion</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto me-2">
              <Nav.Link href="/register" className='text-rock'>Registrarse</Nav.Link>
              <Nav.Link href="/login" className='text-rock'>Iniciar Sesion</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarC;
