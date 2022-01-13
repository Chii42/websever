var express = require("express");
var bodyParser = require("body-parser");
const formidable = require('formidable');
server = express();
var fs = require("fs");
server.use(express.static("html"));//web root
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

var DB = require("nedb-promises");
const { request } = require("express");
var Users = DB.create("users.db");
var Date = DB.create("dates.db");


server.get("/users", function (req, res) {
    Users.find({ "fields.作者": "Tony" }).then((result) => {
        res.send(result);
    })
})

server.get("/users1", function (req, res) {
    Users.find({ "fields.作者": "Eva" }).then((result) => {
        res.send(result);
    })
})

server.get("/users2", function (req, res) {
    Users.find({ "fields.作者":"Louis"}).then((result) => {
        res.send(result);
    })
})

server.get("/users3", function (req, res) {
    Users.find({ "fields.作者": "Allen" }).then((result) => {
        res.send(result);
    })
})

server.post("/contact_file", function (req, res) {
    var form = formidable();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.status(400).send({ error: err.message })
        }
        else {
            var uploadPath = "html/upload";
            fs.renameSync(files.file.filepath, uploadPath + "/" + files.file.originalFilename);
            Users.insert({fields,"img":"upload/" + files.file.originalFilename});
            res.end();
        }
    })
})

server.post("/contact", function(req, res){
    Users.remove({"fields.作者" : req.body.作者,"fields.編號" : req.body.編號});
    res.end();
})

server.listen(8080, function () {
    console.log("Server is running at port 8080");
    // Users.insert({"作品名稱":"asd","作者":"2","作品簡介":"gfg","img":"images/img.jpg"});
    // Users.insert({"fields":{"作品名稱":"2","作者":"2","編號":"2","作品簡介":"2"},"img":"html/upload/img2.jpg"});
    // Users.remove({"作者":"2"});
    // Date.insert({"fields":{"作品名稱":"gfhth","作者":"0","作品簡介":"gaef"},"img":"images/img.png"})
})