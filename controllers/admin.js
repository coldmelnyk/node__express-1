const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getAdminProductsList = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products-list", {
      products,
      pageTitle: "Admin Products",
      path: "/admin/products-list",
    });
  });
};
 
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const desc = req.body.description;
  const price = req.body.price;

  const newProduct = new Product(title, imageUrl, desc, price);

  newProduct.save();
  res.redirect("/");
};
