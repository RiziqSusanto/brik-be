'use strict';
const {faker} = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query('SELECT id FROM "Categories"', {type: Sequelize.QueryTypes.SELECT}).then(category => category);
    const categoryIds = categories.map(category => category.id);

    const products = Array.from({ length: 100 }, (_, index) => {
      const categoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];

      return {
        id: uuidv4(),
        categoryId: categoryId,
        name: faker.commerce.product(),
        sku: faker.commerce.isbn(),
        description: faker.commerce.productDescription(),
        weight: faker.number.int({ min: 100, max: 1000 }),
        width: faker.number.int({ min: 5, max: 50 }),
        length: faker.number.int({ min: 5, max: 50 }),
        height: faker.number.int({ min: 5, max: 50 }),
        image: 'images/half.png',
        harga: faker.number.int({ min: 10000, max: 1000000 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });


    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
