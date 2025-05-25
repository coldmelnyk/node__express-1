const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const desc = req.body.description;
  const price = req.body.price;

  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: desc,
  })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const productId = req.params.productId;

  if (!editMode) {
    return res.redirect("/");
  }

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/edit-product",
        editing: editMode,
        product,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;

      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");

      console.log("UPDATED PRODUCT");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAdminProductsList = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products-list", {
        products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
