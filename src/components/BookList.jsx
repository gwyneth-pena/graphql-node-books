import { useQuery } from "@apollo/client";
import { GetBooksQuery } from '../graphql/queries';
import BookDetails from "./BookDetails";
import { useState } from "react";


function BookList() {
  const { loading, error, data } = useQuery(GetBooksQuery);
  const [selectedBookId, setSelectedBookId] = useState();
  const [showModal, setShowModal] = useState(false);
  const setShowModalPass = (data)=>{
    setShowModal(data);
  };

  if(loading){
    return <p>Loading....</p>;
  }

  if(error){
    return <p>An error occured upon fetching data.</p>;
  }

  return (
    <div>
        <ul>
            {data.books?.map(book=>{
                return <li key={book.id} onClick={()=>{setSelectedBookId(book.id); setShowModal(true)}}>{book.name}</li>;
            })}
        </ul>
        <BookDetails setShowModalPass={setShowModalPass} showModal={showModal} id={selectedBookId}/>
    </div>
  )
}

export default BookList