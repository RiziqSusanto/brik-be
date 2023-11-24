const { Category} = require('../models');
const { v4: uuidv4 } = require('uuid');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        const totalCategories = await Category.count();
        res.status(200).json({
            message: "Success",
            totalData: totalCategories,
            data: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCategory = async (req, res) => {
    const newCategory = {
        id: uuidv4(),
        ...req.body,
    };
    try {
        const category = await Category.create(newCategory);
        res.status(201).json({
            message: "Success",
            data: category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const updatedCategory = req.body;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            await category.update(updatedCategory);
            res.status(200).json({
                message: 'Category updated successfully',
                data: category
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            await category.destroy({ force: false });
            res.status(200).json({ message: 'Category deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
