const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Liz231100", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
