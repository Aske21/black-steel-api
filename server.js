const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hello</h1>");
});

app.get("/hello", function (req, res) {
  res.send("hi");
  res.status(200);
});

//listen on port 5000
app.listen(5000);
