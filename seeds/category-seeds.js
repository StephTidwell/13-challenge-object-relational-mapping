const { Category } = require("../models");

const categoryData = [
  {
    category_name: "Smartphones",
  },
  {
    category_name: "Laptops",
  },
  {
    category_name: "Shorts",
  },
  {
    category_name: "Mugs",
  },
  {
    category_name: "Coffee",
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
