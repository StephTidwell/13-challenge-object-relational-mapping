const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'Shirts',
    },
    {
        category_name: 'Shorts',
    },
    {
        category_name: 'Music',
    },
    {
        category_name: 'Hats',
    },
    {
        category_name: 'Shoes',
    },
    {
        category_name: 'Mugs',
    },
    {
        category_name: 'Coffee',
    }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
