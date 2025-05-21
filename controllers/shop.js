const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products,
      pageTitle: "Shop",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      pageTitle: `${product.title} details`,
      path: "/products",
      product,
    });
  });
};

exports.getShop = (req, res, next) => {
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

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    Product.saveToCart(product);
  });

  res.redirect("/cart");
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
