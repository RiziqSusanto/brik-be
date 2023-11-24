const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const jwtAuth = require("../middleware/jwtAuth");

// Get all categories
router.get('/', jwtAuth, categoryController.getAllCategories);

// Add new category
router.post('/', jwtAuth, categoryController.createCategory);

// Update category by ID
router.put('/:id', jwtAuth, categoryController.updateCategory);

// Delete category by ID
router.post('/delete', jwtAuth, categoryController.deleteCategory);

module.exports = router;
