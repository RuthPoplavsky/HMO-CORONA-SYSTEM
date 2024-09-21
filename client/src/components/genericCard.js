import React from 'react';
import { Card } from 'react-bootstrap';

const GenericCard = ({ title, content, img, style}) => {
  return (
    <Card style={style}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div>{content}</div>
      </Card.Body>
    </Card>
  );
};

export default GenericCard;