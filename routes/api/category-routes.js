const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
        const foundСategories = await Category.findAll({
            include: [
                {
                    model: Product,
                },
            ],
        });

        if (!foundСategories.length) {
            res.status(404).json({
                message: 'No categories found!',
            });

            return;
        }

        res.status(200).json(foundСategories);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foundСategory = await Category.findByPk(req.params.id, {
            include: [
                {
                    model: Product,
                },
            ],
        });

        if (!foundСategory) {
            res.status(404).json({
                message: 'No category found with that id!',
            });

            return;
        }

        res.status(200).json(foundСategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const createdCategory = await Category.create(req.body);

        res.status(200).json(createdCategory);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const foundСategory = await Category.findByPk(req.params.id);

        if (!foundСategory) {
            res.status(404).json({
                message: 'No category found with that id!',
            });

            return;
        }

        await Category.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({
            message: 'Category updated',
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const foundCategory = await Category.findByPk(req.params.id);

        if (!foundCategory) {
            res.status(404).json({
                message: 'No category found with that id!',
            });

            return;
        }

        await foundCategory.destroy();

        res.status(200).json(foundCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
