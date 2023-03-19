const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

router.get('/', async (req, res) => {
    try {
        const foundProducts = await Product.findAll({
            include: [
                {
                    model: Category,
                },
                {
                    model: Tag,
                    through: ProductTag,
                },
            ],
        });

        if (!foundProducts.length) {
            res.status(404).json({
                message: 'No products found!',
            });

            return;
        }

        res.status(200).json(foundProducts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                },
                {
                    model: Tag,
                    through: ProductTag,
                },
            ],
        });

        if (!foundProduct) {
            res.status(404).json({
                message: 'No product found with that id!',
            });

            return;
        }

        res.status(200).json(foundProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    /* req.body should look like this...
        {
            product_name: "Basketball",
            price: 200.00,
            stock: 3,
            tagIds: [1, 2, 3, 4]
        }
    */
    try {
        const createdProduct = await Product.create(req.body);

        if (req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map((tag_id) => {
                return {
                    product_id: createdProduct.id,
                    tag_id,
                };
            });

            const createdProductTags = await ProductTag.bulkCreate(productTagIdArr);

            res.status(200).json({
                createdProduct: createdProduct,
                createdProductTags: createdProductTags,
            });

            return;
        }

        res.status(200).json(createdProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findByPk(req.params.id);

        if (!foundProduct) {
            res.status(404).json({
                message: 'No product found with that id!',
            });

            return;
        }

        const updatedProduct = await Product.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        const foundProductTags = await ProductTag.findAll({
            where: {
                product_id: req.params.id,
            },
        });

        if (foundProductTags.length) {
            const productTagIds = foundProductTags.map(({ tag_id }) => tag_id);

            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            
            const productTagsToRemove = foundProductTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            const removedProductTags = await ProductTag.destroy({
                where: {
                    id: productTagsToRemove,
                },
            });

            const createdProductTags = await ProductTag.bulkCreate(newProductTags);

            res.status(200).json({
                message: 'Product updated',
                removedProductTagsCount: removedProductTags,
                createdProductTags: createdProductTags,
            });

            return;
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findByPk(req.params.id);

        if (!foundProduct) {
            res.status(404).json({
                message: 'No product found with that id!',
            });

            return;
        }

        await foundProduct.destroy();

        res.status(200).json(foundProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
