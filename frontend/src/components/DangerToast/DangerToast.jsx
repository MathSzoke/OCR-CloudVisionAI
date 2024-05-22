import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export function DangerToast({header, message})
{
  const [show, setShow] = useState(true);

  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast 
      show={show}
      onClose={() => setShow(false)}
      className="d-inline-block m-1"
      bg="danger"
      delay={5000}
      autohide
      >
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}