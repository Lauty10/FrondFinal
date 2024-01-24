import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import logoImage from '../Images/Logo.png';
import '../Css/NavbarC.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axiosUrl, { headboard } from '../helps/axiosBase';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





const NavbarC = () => {
  const navigate=useNavigate();
  const [barra, setBarra] = useState(false);

  const toggleSearch = () => {
    setBarra(!barra);
  };

  const sinOff=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("role")
    navigate("/")
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

const [carrRock,setCarrRock]=useState([])

const carrMe=async()=>{
  const rockCarrMe=await axiosUrl.get("/carr")
  setCarrRock(rockCarrMe.data.carrGet)
}

useEffect(()=>{
  carrMe()
},[])

useEffect(()=>{
  console.log(carrRock)
},[carrRock])

const handleCant=(ev)=>{
console.log(ev)
}

const totalPrice=()=>{
  let total=0
  carrRock.forEach((data)=>{
    data.productos.forEach((value)=>{
      total+=value.Precio
    })
  })
  return total
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
            <NavLink  to="/" className='text-rock'>Inicio</NavLink>
            <NavLink to="/sobreNosotros" className='text-rock'>Sobre nosotros</NavLink>
            <NavLink to="#" className='text-rock'>Contacto</NavLink>
          {token && role==="user" ?(
              <>        
              <NavLink to="/fav" className='text-rock'>Favoritos</NavLink>
              <NavLink to="/fav" onClick={handleShow} className='text-rock'>Carrito</NavLink>
            <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Table striped bordered hover>
          <thead>
          <tr>
          <th>Nombre</th>
          <th>Marca</th>
          <th>Precio</th>
          <th>Total</th>
          </tr>
          </thead>
         <tbody>
         {carrRock.map((data) => (
        data.productos.map((producto) => (
        <tr key={producto._id}>
          <td>{producto.Nombre}</td>
          <td>{producto.Marca}</td>
          <td>{producto.Precio}</td>
          <td><input type="number" className='form-control' value={1} onChange={handleCant}/>
          </td>
        </tr>
      ))
    ))}
       </tbody>
    </Table>
    {
      <h2>Precio total a pagar: ${totalPrice()}</h2>
    }
           </Offcanvas.Body>
           </Offcanvas>
              </>
          ):token && role==="admin" && AdminPageProduct=="/admin" ? (
            <>
            <NavLink to="/userAdmin" className='text-rock'>Usuarios</NavLink>        
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
            <NavLink to="/admin" className='text-rock'>Productos</NavLink>        
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
              <NavLink to="/#"  className='text-rock' onClick={sinOff}>Cerrar Sesion</NavLink>
            </Nav>
          ) : (
            <Nav className="ms-auto me-2">
              <NavLink to="/register" className='text-rock'>Registrarse</NavLink>
              <NavLink to="/login" className='text-rock'>Iniciar Sesion</NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarC;
