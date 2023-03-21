const { Tag } = require("../models");

const tagData = [
  {
    tag_name: "Apple",
  },
  {
    tag_name: "Samsung",
  },
  {
    tag_name: "Dell",
  },
  {
    tag_name: "HP",
  },
  {
    tag_name: "Lenovo",
  },
  {
    tag_name: "Nike",
  },
  {
    tag_name: "Adidas",
  },
  {
    tag_name: "Under Armour",
  },
  {
    tag_name: "Coffee",
  },
  {
    tag_name: "Tea",
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
