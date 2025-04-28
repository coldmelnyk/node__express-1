const fs = require("fs");
const path = require("path");

const rootPath = require("../utils/path");

const pathToTheProducts = path.join(rootPath, "data", "products.json");

const getProductsFromFile = (callback) => {
  fs.readFile(pathToTheProducts, (error, fileContent) => {
    if (error) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
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
};
