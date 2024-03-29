
import Card from 'react-bootstrap/Card';
import "../Css/CardC.css"
import { Link } from 'react-router-dom';
import axiosUrl, { configToken } from '../helps/axiosBase';
import Swal from 'sweetalert2'



const CardC = ({ title, imageUrl, idProduct, idPage, idDelete,userFavLoad,stateUserFav}) => {


  const deleteProduct=async(id)=>{
    const token=JSON.parse(sessionStorage.getItem("token"))||"";
    const config=configToken(token)
    const deleteProduct=await axiosUrl.delete(`/fav/${id}`,config)
    if (deleteProduct.status===200) {
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: "El producto se elimino correctamente"
      });
      stateUserFav(!userFavLoad)
    }
  }

  return (
    <Card id='style-card' className='border-0 mt-5' style={{ width: '18rem' }}>
      <Card.Img className='img-card' variant="top" src={imageUrl} alt='product-Rock' />
      <Card.Body  className='card-body'>
        <Card.Title id='title-id'>{title}</Card.Title>
        {idPage === 'favPage' ? (
          <Link className='btn btn-danger w-100' onClick={()=>deleteProduct(idDelete)}>Eliminar</Link>
        ) : (
          <Link to={`/productos/${idProduct}`} className='btn btn-warning w-100'>
            Ver mas
          </Link>
        )}
      </Card.Body>
    </Card>
  );

};

export default CardC;
