'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { id: uuidv4(), name: 'Cemilan', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Minuman', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Makanan Ringan', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Makanan Berat', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
