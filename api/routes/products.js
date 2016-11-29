const Joi = require('joi');
const sharp = require('sharp');
const Guid = require('guid');
const multer = require('multer');
const router = require('express').Router;

const initialData = require('../data/products');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const productsApi = router();

// Create some initial products
const inMemoryProducts = initialData;

// dest: `${__dirname}/../public/uploads`
// Upload product image and assign it to product, declare before product update
// so it gets dibs on the route matching
productsApi.put('/upload', upload.single('product_image'), (req, res) => {
  const productId = req.body.product_id;
  const filename = productId + Date.now();

  sharp(req.file.buffer)
    .resize(200, 200)
    .crop(sharp.strategy.entropy)
    .toFile(`${__dirname}/../public/uploads/${filename}`, (err) => {
      if (err) {
        console.error('woops', err);
      }

      inMemoryProducts[productId].imageUrl = `http://localhost:3000/uploads/${filename}`;
      inMemoryProducts[productId].imageName = req.file.originalname;

      res.status(201);
      res.send({
        data: req.file.originalname,
      });
    });
});


// Get all products
productsApi.get('/', (req, res) => {
  res.status(200); // 200 OK
  res.json({ data: Object.keys(inMemoryProducts).map((key) => inMemoryProducts[key]) });
});

// Get one product
productsApi.get('/:productId', (req, res) => {
  res.status(200); // 200 OK
  res.json({ data: inMemoryProducts[req.params.productId] });
});

// Create products
productsApi.post('/', (req, res) => {
  const validationSchema = {
    name: Joi.string().min(3).max(32).required(),
    description: Joi.string().allow('').max(128),
    price: Joi.number().integer().positive().required(),
  };

  const data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  Joi.validate(data, validationSchema, { abortEarly: false }, (err, validatedData) => {
    if (err !== null) {
      res.status(400); // 400 Bad request
      res.json({
        errors: err.details.map((info) => ({
          title: info.message,
          status: 400,
        })),
      });
      return;
    }

    const newProduct = Object.assign({
      id: Guid.raw(),
      imageUrl: '',
      imageName: '',
    }, validatedData);

    inMemoryProducts[newProduct.id] = newProduct;

    res.status(201); // 201 Created
    res.json({
      data: newProduct,
    });
  });
});

// Update product
productsApi.put('/:productId', (req, res) => {
  const validationSchema = {
    id: Joi.string().guid().required(),
    name: Joi.string().min(3).max(32).required(),
    description: Joi.string().allow('').max(128),
    price: Joi.number().integer().positive().required(),
  };

  const data = {
    id: req.params.productId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  Joi.validate(data, validationSchema, { abortEarly: false }, (err, validatedData) => {
    if (err !== null) {
      res.status(400); // 400 Bad request
      res.json({
        errors: err.details.map((info) => ({
          title: info.message,
          status: 400,
        })),
      });
      return;
    }

    if (!inMemoryProducts[validatedData.id]) {
      res.status(404); // 404 Not found;
      res.json({
        errors: [{
          error: 'Product not found',
          status: 404,
        }],
      });
      return;
    }

    inMemoryProducts[validatedData.id] = Object.assign(
      inMemoryProducts[validatedData.id],
      validatedData
    );

    res.status(201); // 201 Created
    res.json({ data: inMemoryProducts[validatedData.id] });
  });
});

// Delete product
productsApi.delete('/:productId', (req, res) => {
  const productId = req.params.productId;

  if (!inMemoryProducts[productId]) {
    res.status(404); // 404 Not found;
    res.json({
      errors: [{
        error: 'Product not found',
        status: 404,
      }],
    });
    return;
  }

  delete inMemoryProducts[productId];

  res.status(204); // 204 No Content
  res.send();
});

module.exports = productsApi;
