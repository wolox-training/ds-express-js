'use strict';

const { POSITIONS } = require('../../app/constants/users');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'users',
        'score',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'users',
        'position',
        {
          type: Sequelize.ENUM,
          values: Object.values(POSITIONS),
          defaultValue: POSITIONS.DEVELOPER,
          allowNull: false
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: async queryInterface => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('users', 'score', { transaction });
      await queryInterface.removeColumn('users', 'position', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
