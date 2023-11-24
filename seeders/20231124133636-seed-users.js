'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync('password', salt);

    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
