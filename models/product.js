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
  constructor(id, title, imageUrl, desc, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.desc = desc;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(
          pathToTheProducts,
          JSON.stringify(updatedProducts),
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.id = Math.random().toString();
        products.push(this);

        fs.writeFile(pathToTheProducts, JSON.stringify(products), (error) => {
          console.log(error);
        });
      }
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const productNeeded = products.find((product) => product.id === id);

      callback(productNeeded);
    });
  }
};
