const express = require('express');
const {createHandler} = require('graphql-http/lib/use/express');
const schema = require("./schema/schema");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const port = 4000;

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/qlLibrary').then(()=>{
    console.log("Connected to mongodb...");
});

app.all('/graphql', createHandler({ 
    schema
}));

app.listen(port, ()=>{
    console.log(`Server running on port ${port}...`);
});