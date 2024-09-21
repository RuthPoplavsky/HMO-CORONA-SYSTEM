import React from 'react';
import { Modal } from 'react-bootstrap';

const GenericModal = ({ show, title, children }) => {
  return (
    <Modal show={show} onHide={() => {}} keyboard={false} backdrop="static">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default GenericModal;

