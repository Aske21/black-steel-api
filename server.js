const express = require("express");
const app = express();


app.get("/", function (req, res) {
    res.send('<h1>Hello</h1>');
});


//listen on port 5000
app.listen(5000);