const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, as: 'products' }],
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id);
    if (!oneCategory) {
      res.status(404).json({ message: 'not a valid category id' });
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const newCategory = await Category.create(req.body);
  return res.json(newCategory);
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
    if (!updatedCategory) {
      res.status(404).json({ message: 'no category with that id' });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json(deletedCategory);
});

module.exports = router;
