const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send({hello: "world"});
})

// http://localhost:8080/add/1/2
/* app.get("/add/:num1/:num2", (req, res) => {
    //console.log("Hi");
    res.send({sum: parseInt(req.params.num1) + parseInt(req.params.num2)});
}); */

const numberParser = (req, res, next) => {
    req.query.num1 = parseInt(req.query.num1);
    req.query.num2 = parseInt(req.query.num2);
    next();
}

app.get("/add", numberParser, (req, res) => {
    res.send({sum: req.query.num1 + req.query.num2});
}); 

// http://localhost:8080/add?num1=5&num2=3
/* app.get("/add", (req, res) => {
    res.send({sum: parseInt(req.query.num1) + parseInt(req.query.num2)});
}); */

// http://localhost:8080/add and body -> raw -> JSON {"num1": 4, "num2": 3}
/* app.post("/add", (req, res) => {
    res.send({sum: req.body.num1 + req.body.num2});
}); */ 

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.listen(8080, "0.0.0.0", () => {
    console.log("Server is running");
})