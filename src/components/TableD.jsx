
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axiosUrl, { configToken } from '../helps/axiosBase';
import Swal from 'sweetalert2'




const TableD = ({data,loadUser}) => {

  const{setLoad,load}=loadUser

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    const [edit,setEdit]=useState({
        Nombre:'',
        Correo:'',
        Nacionalidad:'',
        Role:''
    })


    const handleShow = (idUser) =>{
        setShow(true)
        const updateRock=data.find((rock)=>rock._id===idUser)
        setEdit(updateRock)
    }

    const editCHange=(ev)=>{
        setEdit({...edit,[ev.target.name]:ev.target.value})
    }

    const postEdit= async (ev)=>{
        ev.preventDefault()
        try {
          const token=JSON.parse(sessionStorage.getItem("token"))||"";
          const config=configToken(token)
            const RockFull= await axiosUrl.put(`/usuarios/${edit._id}`,{
                Nombre:edit.Nombre,
                Correo:edit.Correo,
                Nacionalidad:edit.Nacionalidad,
                Role:edit.Role
            },config)
            if (RockFull.status===200) {
                alert("Producto Actualizado")
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
    }

    const deleteUser=async(id)=>{
        try {
            const confirmDelete=confirm("Seguro deseas eliminar este usuario?")
            if (confirmDelete) {
              const token=JSON.parse(sessionStorage.getItem("token"))||"";
              const config=configToken(token)
                const RockDelete=await axiosUrl.delete(`/usuarios/${id}`,config)
                if (RockDelete.status===200) {
                    alert("Usuario eliminado correctamente")
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
    <div className='d-flex justify-content-center body-table'>
    <Table striped bordered hover className='my-5 w-25 '>
    <thead>
      <tr>
        <th className='style-font'>Nombre</th>
        <th className='style-font'>Correo</th>
        <th className='style-font'>Role</th>
        <th className='style-font'>Acciones</th>
      </tr>
    </thead>
    <tbody>
  {data.map((info)=>(
  <tr key={info._id}>
  <td className='font-style'>{info.Nombre}</td>
  <td id='correo-style' className='font-style '>{info.Correo}</td>
  <td className='font-style'>{info.Role}</td>
  <td>
  <>
      <Button className='buttonD' variant="warning" onClick={()=>handleShow(info._id)}>
        Editar
      </Button>

      <Button disabled={info.Role==="admin"} className='buttonD' variant="danger" onClick={()=>deleteUser(info._id)}>
        Eliminar
      </Button>

      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>Bienvenido a Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingresa el nombre" name='Nombre' value={edit.Nombre} onChange={editCHange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Correo</Form.Label>
        <Form.Control type="email" placeholder="Ingresa el correo" name='Correo' value={edit.Correo} onChange={editCHange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Nacionalidad</Form.Label>
        <Form.Control type="text" placeholder="Ingresa la nacionalidad" name='Nacionalidad' value={edit.Nacionalidad} onChange={editCHange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Role</Form.Label>
        <Form.Control type="text" placeholder="Ingresa el role"  name='Role' value={edit.Role} onChange={editCHange} />
        </Form.Group>

      <Button variant="warning" type="submit" onClick={postEdit}>
        Enviar
      </Button>
      </Form>
      </Modal.Body>
      </Modal>
    </>
  </td>
</tr>
  ))}
 </tbody>
  </Table>
  </div>
  )
}

export default TableD