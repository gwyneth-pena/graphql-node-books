import { useQuery } from '@apollo/client';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { GetBookQuery } from '../graphql/queries';

function BookDetails({id, showModal, setShowModalPass}) {
  const { data: bookData } = useQuery(GetBookQuery, {variables: {id:id}});
  
  const handleClose = () => setShowModalPass(false);

  return (
    <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Book Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>Title: <span><strong>{bookData?.book?.name}</strong></span></p>
        <p>Author: <span><strong>{bookData?.book?.author.name}</strong></span></p>
        <p>Genre: <span><strong>{bookData?.book?.genre}</strong></span></p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default BookDetails