const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/shop", {
      products,
      pageTitle: "Shop",
      path: "/shop",
    });
  });
};

exports.getSlicedProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    const slicedProducts = products.slice(0, 5);

    res.render("shop/index", {
      slicedProducts,
      pageTitle: "Home Products",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Product.getCartProducts((products) => {
    res.render("shop/cart", {
      products,
      pageTitle: "Cart",
      path: "/cart",
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};
