# Using the API in an app

### 'Post' Object
The post object represents a single blog post and is described in the following JSON format;

{
  _id: ObjectID(),
  author: string,
  heading: string,
  summary: string,
  content: string
}

## Routes
### GET

'/allPosts'
 Returns an array of post objects.
 
 '/post/:uid'
 Returns a specific post object.. The ID relates to the '_id: ObjectID' field.

### POST
The POST requests expect a JSON object in their body.

'/posts'
Takes a post object and adds it to the database
