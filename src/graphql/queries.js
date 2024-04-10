const { gql } = require("@apollo/client");

const GetBooksQuery = gql`
    {
        books{
            name,
            id
        }
    }
`;


const GetAuthorsQuery = gql`
    {
        authors{
            name,
            id,
        }
    }
`;

const AddBookQuery = gql`
    mutation($name: String!, $genre:String, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name,
            genre,
            author{
                name,
                age,
                id
            }
        }
    }
`;

const GetBookQuery = gql`
    query($id: ID!){
        book(id:$id){
            name,
            genre,
            author{
                name,
                age,
                id,
                books{
                    name
                }
            }
        }
    }
`;

export {
    GetBooksQuery,
    GetAuthorsQuery, 
    AddBookQuery,
    GetBookQuery
};