const { Product } = require("../models");

const productData = [
  {
    product_name: "iPhone 13 Pro",
    price: 1099.99,
    stock: 10,
    category_id: 4,
  },
  {
    product_name: "Samsung Galaxy S21 Ultra",
    price: 899.99,
    stock: 15,
    category_id: 4,
  },
  {
    product_name: "MacBook Pro",
    price: 1499.99,
    stock: 5,
    category_id: 5,
  },
  {
    product_name: "Dell XPS 13",
    price: 1299.99,
    stock: 7,
    category_id: 5,
  },
  {
    product_name: "JavaScript Mug",
    price: 9.99,
    stock: 22,
    category_id: 2,
  },
  {
    product_name: "Node.js Mug",
    price: 7.99,
    stock: 30,
    category_id: 2,
  },
  {
    product_name: "Express.js Mug",
    price: 8.99,
    stock: 60,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
