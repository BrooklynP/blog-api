const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const port = 3000;
const uri = 'mongodb+srv://admin:bnA48sjRo1nkH9B0@sandbox-joeds.mongodb.net/test?retryWrites=true&w=majority'

function main() {
    app.use(bodyParser.urlencoded({ extended: false }))

    app.listen(port, () => {
        console.log("Server listening on port 3000");
    })

    app.get('/allPosts', async (req, res) => {
        let posts = await getAllPosts();
        res.send(posts);
    })

    app.get('/post/:uid', async (req, res) => {
        let post = await getPostByID(req.params.uid);
        res.send(post);
    })

    app.post('/posts/', async (req, res) => {
        const newPost = {
            author: req.body.tauthor,
            heading: req.body.theading,
            content: req.body.tcontent,
            timeStamp: req.body.ttimeStamp,
        }
        addPost(newPost);
        res.send("created: " + newPost)
    });
}
main();

async function addPost(postToAdd){
    const cluster = await mongoClient.connect(uri, { useUnifiedTopology: true });
    console.log("Connected to mongoDB cluster");

    const db = cluster.db('devBlog');
    console.log("Connected to database")

    const result = await db.collection('blogPosts').insertOne(postToAdd)
    console.log("Result posted");
}

async function getAllPosts() {
    const cluster = await mongoClient.connect(uri, { useUnifiedTopology: true });
    console.log("Connected to mongoDB cluster");

    const db = cluster.db('devBlog');
    console.log("Connected to database")

    const result = await db.collection('blogPosts').find({}).toArray();
    console.log("Result recieved");

    return result;
}

async function getPostByID(id) {
    const cluster = await mongoClient.connect(uri, { useUnifiedTopology: true });
    console.log("Connected to mongoDB cluster");

    const db = cluster.db('devBlog');
    console.log("Connected to database")

    const result = await db.collection('blogPosts').findOne({_id : new ObjectId(id)});
    console.log("Result recieved");

    return result; 
}