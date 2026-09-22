const express = require('express');  //import
const app = express();  //create
const path = require('path');
const fs = require('fs');
const { log } = require('console');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){       //express,  //here function is request handler
    fs.readdir(`./files`, function(err, files){       //node,  //here function is callback
        res.render("index", {files :files});
    })
})

app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){
        // console.log(filedata)
        res.render('show', {filename: req.params.filename, filedata :filedata});
    })
})

app.get('/edit/:filename', function(req, res){
    res.render('edit', {filename: req.params.filename});
})

app.post('/edit', function(req,res){
    // console.log(req.body);
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}.txt`, function(err){
        res.redirect("/");
    });
})

app.post('/create', function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect('/');
    })
})

app.listen(3000);