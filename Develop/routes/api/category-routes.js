const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all readers
// router.get('/', async (req, res) => {
//   try {
//     const readerData = await Reader.findAll({
//       // TODO: Add a comment describing the functionality of this property
//       include: [{ model: LibraryCard }],
//     });
//     res.status(200).json(readerData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// find all categories
// be sure to include its associated Products


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
  // create a new category
  const newCategory = await Category.create(req.body);
  return res.json(newCategory);
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updatedCategory = await Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return res.json(updatedCategory);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json(deletedCategory);
});


module.exports = router;
