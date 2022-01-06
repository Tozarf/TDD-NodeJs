const { default: axios } = require("axios");
const bodyParser = require("body-parser");
const express = require("express");
const { posts } = require("./endpoints");
const { authenticate } = require("./middlewares");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const postHandlers = posts({ axios });
app.post("/", authenticate, postHandlers.post);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
