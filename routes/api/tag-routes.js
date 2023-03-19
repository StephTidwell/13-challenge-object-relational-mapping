const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    try {
        const foundTags = await Tag.findAll({
            include: [
                {
                    model: Product,
                    through: ProductTag,
                },
            ],
        });

        if (!foundTags.length) {
            res.status(404).json({
                message: 'No tags found!',
            });

            return;
        }

        res.status(200).json(foundTags);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foundTag = await Tag.findByPk(req.params.id, {
            include: [
                {
                    model: Product,
                    through: ProductTag,
                },
            ],
        });

        if (!foundTag) {
            res.status(404).json({
                message: 'No tag found with that id!',
            });

            return;
        }

        res.status(200).json(foundTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const createdTag = await Tag.create(req.body);

        res.status(200).json(createdTag);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const foundTag = await Tag.findByPk(req.params.id);

        if (!foundTag) {
            res.status(404).json({
                message: 'No tag found with that id!',
            });

            return;
        }

        await Tag.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({
            message: 'Tag updated',
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const foundTag = await Tag.findByPk(req.params.id);

        if (!foundTag) {
            res.status(404).json({
                message: 'No tag found with that id!',
            });

            return;
        }

        await foundTag.destroy();

        res.status(200).json(foundTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
