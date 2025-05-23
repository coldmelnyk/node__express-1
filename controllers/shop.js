const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        products: rows,
        pageTitle: "All products",
        path: "/products",
      });
    })
    .catch(() => {
      res.render("shop/product-list", {
        products: [],
        pageTitle: "All products",
        path: "/products",
      });
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        pageTitle: `${product[0].title} details`,
        path: "/products",
        product: product[0],
      });
    })
    .catch((error) => console.log(error));
};

exports.getShop = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      const slicedProducts = rows.slice(0, 6);

      res.render("shop/index", {
        products: slicedProducts,
        pageTitle: "Home",
        path: "/",
      });
    })
    .catch(() => {
      res.render("shop/index", {
        products: [],
        pageTitle: "Home",
        path: "/",
      });
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );

        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }

      res.render("shop/cart", {
        products: cartProducts,
        pageTitle: "Cart",
        path: "/cart",
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });

  res.redirect("/cart");
};

exports.postDeleteFromCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
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
