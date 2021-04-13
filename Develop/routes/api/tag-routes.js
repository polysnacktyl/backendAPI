const router = require('express').Router();
const { Tag, Product, ProductTag, } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const Tags = await Tag.findAll({
      include: [
        { model: Product, as: 'products' },
      ],
    });
    res.status(200).json(Tags);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id);
    if (!oneTag) {
      res.status(404).json({ message: 'no tag with that id' });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
// be sure to include its associated Product data

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTag) {
      res.status(400).json({ message: 'no tag with that id' });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const byeTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!byeTag) {
      res.status(404).json({ message: 'no tag with that id' });
      return;
    }
    res.status(200).json(byeTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
