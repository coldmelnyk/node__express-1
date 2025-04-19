const express = require("express");

const app = express();

app.get("/favicon.ico", (req, res) => res.status(204));

app.use('/add-product', (req, res, next) => {
  console.log("Add-product middleware");
  res.send("<h1>The add product page</h1>");
});

app.use('/', (req, res, next) => {
  console.log("In second middleware");
  res.send("<h1>Hello from Express.js</h1>");
});

app.listen(3030);
