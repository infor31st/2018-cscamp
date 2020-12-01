const express = require('express');
const path = require('path');

var app = express();
app.use("/", express.static("."));

app.listen(3000, () => {
    console.log("server started.")
});