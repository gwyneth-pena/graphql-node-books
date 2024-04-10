import { useQuery, useMutation } from "@apollo/client";
import { AddBookQuery, GetAuthorsQuery, GetBooksQuery, } from "../graphql/queries";
import { useForm } from 'react-hook-form';

function AddBook() {
  const { data: authorData } = useQuery(GetAuthorsQuery);
  const [addBook, { error: addBookError }] = useMutation(AddBookQuery);


  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = (data) => {
    addBook({variables: {...data}, refetchQueries: [GetBooksQuery]});
    if(!addBookError){
        reset();
    }
  }

  return (
    <form className="add-book-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control-row">
            <label htmlFor="name">Book Title</label>
            <input name="name" id="name" type="text" placeholder="Title" {...register('name', {required:true})} required/>
        </div>
        <div className="form-control-row">
            <label htmlFor="genre">Genre</label>
            <input name="genre" id="genre" type="text" placeholder="Genre" {...register('genre', {required:false})}/>
        </div>
        <div className="form-control-row">
            <label htmlFor="authorId">Author</label>
            <select defaultValue="" id="authorId" name="authorId" {...register('authorId', {required:true})} required>
                <option value="" disabled>Select author</option>
                {authorData?.authors?.map(author=>{
                    return <option key={author.id} value={author.id}>{author?.name}</option>
                })}
            </select>
        </div>
        <button>+ Add</button>
    </form>  
  )
}

export default AddBook;