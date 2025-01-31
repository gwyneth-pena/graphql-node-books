const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
            author: { 
                type: AuthorType,
                resolve(parent, args){
                    return Author.findById(parent.authorId);
                }
            }
        })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
            id: { type: GraphQLID },
            age: { type: GraphQLInt },
            name: { type: GraphQLString },
            books: { 
                type: new GraphQLList(BookType),
                resolve(parent, args){
                    return Book.find({authorId:parent.id});
                }
            }
        })
});

const RootQuery= new GraphQLObjectType({
    name:'RootQuery',
    fields: {
        book:{
            type: BookType,
            args: { id:{ type: GraphQLID } },
            resolve(parent, args){
                return Book.findById(args.id);

            }
        },
        author:{
            type: AuthorType,
            args: { id:{ type: GraphQLID } },
            resolve(parent, args){
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(){
                return Book.find();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(){
                return Author.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt }
            },
            resolve(parent,args){
                let newAuthor = new Author({
                    name: args.name,
                    age: args.age
                });
        
                return newAuthor.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                genre: { type: GraphQLString },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let newBook = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return newBook.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}) 
