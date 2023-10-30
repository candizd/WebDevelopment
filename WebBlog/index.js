import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.on('finish', () => {
      console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    });
    next();
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.get("/", (req, res) => {
    res.render("index.ejs", {posts});
});

app.post("/create", (req,res) => {

    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content 
    };
    posts.push(newPost);
    console.log("Success");
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.redirect('/');
    } else {
        res.send('Post not found');
    }
});

app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = posts.find(post => post.id === postId);
    if (postToEdit) {
        res.render('edit.ejs', { post: postToEdit });
    } else {
        res.send('Post not found');
    }
});

app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = posts.find(post => post.id === postId);
    if (postToEdit) {
        postToEdit.title = req.body.title;
        postToEdit.content = req.body.content;
        res.redirect('/');
    } else {
        res.send('Post not found');
    }
});