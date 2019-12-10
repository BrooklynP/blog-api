const mongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const port = 3000;
const uri = 'mongodb+srv://admin:bnA48sjRo1nkH9B0@sandbox-joeds.mongodb.net/test?retryWrites=true&w=majority'

function main() {
    let api = app.listen(port, () => {
        console.log("Server listening on port 3000");
    })

    app.get('/allPosts', async (req, res) => {
        let posts = await getAllPosts();
        res.send(posts);
    })
}
main();

async function getAllPosts() {
    const cluster = await mongoClient.connect(uri, { useUnifiedTopology: true });
    console.log("Connected to mongoDB cluster");

    const db = cluster.db('devBlog');
    console.log("Connected to database")

    const result = await db.collection('blogPosts').find({}).toArray();
    console.log("Result recieved");

    return result;
}