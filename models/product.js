const fs = require("fs");
const path = require("path");

const rootPath = require("../utils/path");

const pathToTheProducts = path.join(rootPath, "data", "products.json");
const pathToTheCart = path.join(rootPath, "data", "cart.json");

const getProductsFromFile = (callback) => {
  fs.readFile(pathToTheProducts, (error, fileContent) => {
    if (error) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

const getProductsFromCartFile = (callback) => {
  fs.readFile(pathToTheCart, (error, fileContent) => {
    if (error) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, desc, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.desc = desc;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(pathToTheProducts, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static getCartProducts(callback) {
    getProductsFromCartFile(callback);
  }
};
