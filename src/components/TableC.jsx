import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import "../Css/TableC.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axiosUrl, { configToken } from '../helps/axiosBase';
import Swal from 'sweetalert2'


const TableC = ({ data,loadUser}) => {

  const{setLoad,load}=loadUser

  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
  
    const handleShow = (Rockid) =>{
      setShow(true)
     const rockProduct=data.find((info)=>info._id===Rockid)
     setState(rockProduct)
    };

    const [state, setState] = useState({
      Nombre: '',
      Marca: '',
      Precio: '',
      Descripcion:'',
      Imagen: ''
    });
    


    const handleChage=(ev)=>{
      setState({...state,[ev.target.name]:ev.target.value})
    }



    const editProductRock = async (ev) => {
      ev.preventDefault();
      try {
        const token=JSON.parse(sessionStorage.getItem("token"))||"";
        const config=configToken(token)
        const sendPost = await axiosUrl.put(`/productos/${state._id}`, {
          Nombre: state.Nombre,
          Marca: state.Marca,
          Descripcion:state.Descripcion,
          Precio: state.Precio,
          Imagen: state.Imagen
        },config);
    
        if (sendPost.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Producto actualizado',
            text: "El producto se actualizo correctamente "
          });
          setLoad(!load)
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
    };

    const deleteProduct= async (id)=>{
     try {
      const confirmDelete=confirm("Estas seguro de borrar este producto?")
      if (confirmDelete) {
        const token=JSON.parse(sessionStorage.getItem("token"))||"";
        const config=configToken(token)
        const rockDelete= await axiosUrl.delete(`/productos/${id}`,config)
        if (rockDelete.status===200) {
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: "El producto se elimino correctamente"
          });
          setLoad(!load)
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
    
  

 
  return (
    <div className='d-flex justify-content-center body-table '>
      <Table striped bordered hover size="sm" className='w-100 my-5'>
        <thead>
          <tr>
            <th  className='style-title '>Nombre</th>
            <th  className='style-title'>Marca</th>
            <th  className='style-title'>Precio</th>
            <th  className='style-title'>Imagen</th>
            <th  className='style-title'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((info) => (
              <tr className='font-style' key={info._id}>
              <td className='font-style'>{info.Nombre}</td>
              <td className='font-style'>{info.Marca}</td>
              <td className='font-style'>{info.Precio}</td>
              <td className='font-style'><img className='style-img' src={info.Imagen} alt="Producto"/></td>
              <td>
              <Button className='button-flex' variant="warning" onClick={()=>handleShow(info._id)}>Editar</Button>
              <Button className='button-flex' variant="danger" onClick={()=>deleteProduct(info._id)}>Eliminar</Button>

             <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
             <Modal.Title>Edicion de producto</Modal.Title>
             </Modal.Header>

             <Modal.Body>
             <Form>

             <Form.Group className="mb-3">
             <Form.Label>Nombre</Form.Label>
             <Form.Control type="text" placeholder="Ingresa un nombre" name='Nombre' value={state.Nombre} onChange={handleChage}/>
             </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
           <Form.Control type="text" placeholder="Ingresa la marca"  name='Marca' value={state.Marca} onChange={handleChage} />
           </Form.Group>

           <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
           <Form.Control type="text" placeholder="Ingresa la descripcion"  name='Descripcion' value={state.Descripcion} onChange={handleChage} />
           </Form.Group>

           
           <Form.Group className="mb-3" >
            <Form.Label>Precio</Form.Label>
           <Form.Control type="number" placeholder="Ingresa el precio"  name='Precio' value={state.Precio} onChange={handleChage}/>
           </Form.Group>

           
           <Form.Group className="mb-3" >
            <Form.Label>Imagen</Form.Label>
           <Form.Control type="text" placeholder="Ingresa la URL"  name='Imagen' value={state.Imagen} onChange={handleChage} />
           </Form.Group> 

           <Button variant="primary" type="submit" onClick={editProductRock}>
            Editar Producto
           </Button>
            </Form>
             </Modal.Body>
             </Modal>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableC;
