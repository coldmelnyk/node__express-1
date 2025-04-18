const express = require("express");

const app = express();

app.get("/favicon.ico", (req, res) => res.status(204));

app.use((req, res, next) => {
  console.log("In first middleware");
  next();
});

app.use((req, res, next) => {
  console.log("In second middleware");
  res.send("<h1>Hello from Express.js</h1>");
});

app.listen(3030);
