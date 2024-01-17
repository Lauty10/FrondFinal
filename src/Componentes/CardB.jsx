import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../Css/CardC.css"


const CardB = ({titleCatalogue,imgCatalogue}) => {
  return (
     <Card id='style-card'  className='border-0' style={{ width: '18rem' }}>
      <Card.Img variant="top" className='card-img' src={imgCatalogue} />
      <Card.Body className='card-body'>
        <Card.Title id='title-id'>{titleCatalogue}</Card.Title>
        <Button className='w-100' variant="warning">Ver mas</Button>
      </Card.Body>
    </Card>
  );
};
export default CardB;
