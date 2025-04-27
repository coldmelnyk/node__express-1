const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/favicon.ico", (req, res) => res.status(204));

router.get("/", (req, res, next) => {
  const products = adminData.products;

  res.render("shop", { products, pageTitle: "Shop", path: "/" });
});

exports.routes = router;
