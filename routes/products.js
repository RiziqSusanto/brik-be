const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const jwtAuth = require("../middleware/jwtAuth");
const {uploadSingle} = require("../middleware/multer");

// Get all products
router.get('/', jwtAuth, productController.getAllProducts);

// Get product by ID
router.get('/:id', jwtAuth, productController.getProductById);

// Add new product
router.post('/', jwtAuth, productController.createProduct);

// Update product by ID
router.put('/:id', jwtAuth, productController.updateProduct);

// Delete product by ID
router.post('/delete', jwtAuth, productController.deleteProduct);

//Upload an image product
router.post(
    "/upload",
    uploadSingle,
    jwtAuth,
    productController.uploadImage
);

module.exports = router;
