const mongoClient = require('mongodb').MongoClient;

async function main() {
    const uri = 'mongodb+srv://admin:bnA48sjRo1nkH9B0@sandbox-joeds.mongodb.net/test?retryWrites=true&w=majority'

    mongoClient.connect(uri, (err, cluster) => {
        if (err)
            throw err;
        console.log("Connected to mongoDB!");

        let db = cluster.db('devBlog');

        db.collection("blogPosts").find({}).toArray((err, res) => {
            if(err) throw err;
            console.log("---All Documents---")
            console.log(res);
        })

        cluster.close();
    });

}
main();