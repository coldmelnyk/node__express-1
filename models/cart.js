const fs = require("fs");
const path = require("path");

const rootPath = require("../utils/path");

const pathToTheCart = path.join(rootPath, "data", "cart.json");

module.exports = class Cart {
  static getCart(cb) {
    fs.readFile(pathToTheCart, (error, fileContent) => {
      let cart = JSON.parse(fileContent);

      if (!error) {
        cb(cart);
      } else {
        cb(null);
      }
    });
  }

  static addProduct(id, productPrice) {
    fs.readFile(pathToTheCart, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!error) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = +cart.totalPrice + +productPrice;
      fs.writeFile(pathToTheCart, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(pathToTheCart, (error, fileContent) => {
      if (error) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);

      if (!product) {
        return;
      }

      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(pathToTheCart, JSON.stringify(updatedCart), (error) => {
        console.log(error);
      });
    });
  }
};
