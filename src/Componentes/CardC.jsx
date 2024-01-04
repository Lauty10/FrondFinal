import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../Css/CardC.css"


const CardC = ({ title, content, imageUrl }) => {
  return (
     <Card id='style-card' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className='card-body'>
        <Card.Title id='title-id'>{title}</Card.Title>
        <Card.Text>
         {content}
        </Card.Text>
        <Button className='w-100' variant="warning">Ver mas</Button>
      </Card.Body>
    </Card>
  );
};
export default CardC;
