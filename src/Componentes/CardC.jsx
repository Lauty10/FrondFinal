import React from 'react';
import Card from 'react-bootstrap/Card';
import "../Css/CardC.css"
import { Link } from 'react-router-dom';


const CardC = ({title,imageUrl,idProduct}) => {
  return (
     <Card id='style-card' className='border-0' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className='card-body'>
        <Card.Title id='title-id'>{title}</Card.Title>
        <Link to={`/productos/${idProduct}`} className='btn btn-warning w-100'>Ver mas</Link>
      </Card.Body>
    </Card>
  );
};
export default CardC;
