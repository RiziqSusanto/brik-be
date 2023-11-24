const { Product, Category } = require('../models');
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const fs = require("fs-extra");
const {Sequelize} = require("sequelize");

const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const search = req.query.search

        let whereClause = {};
        if (search) {
            whereClause = {
                name: {
                    [Sequelize.Op.iLike]: `%${search}%`,
                },
            };
        }

        const products = await Product.findAll({
            where: whereClause,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [["createdAt", "DESC"]]
        });
        const totalProducts = await Product.count();

        res.status(200).json({
            message: "Success",
            data: products,
            totalData: totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / pageSize),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json({
                message: "Success",
                data: product
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProduct = async (req, res) => {
    const newProduct = {
        id: uuidv4(),
        ...req.body,
        image: `images/${req.body.image}`,
    };
    try {
        const category = await Category.findByPk(newProduct.categoryId);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }

        const product = await Product.create(newProduct);
        res.status(201).json({
            message: "Success",
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    console.log(updatedProduct, '123123')
    try {
        let newData;
        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        }
        if (updatedProduct.image === product.image) {
            newData = {
                ...updatedProduct,
                image: product.image
            }

        } else {
            await fs.unlink(path.join(`public/${product.image}`));
            newData = {
                ...updatedProduct,
                image: `images/${updatedProduct.image}`
            }
        }
        console.log(updatedProduct, '123123')
        await product.update(newData);
        res.status(200).json({
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            await product.destroy();
            res.status(200).json({ message: 'Product deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const uploadImage = async (req, res) => {
    try {
        const image = req.file ? req.file.originalname : null;

        return res.status(200).json({
            message: "Success upload an image",
            data: image,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating product" });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage
};
