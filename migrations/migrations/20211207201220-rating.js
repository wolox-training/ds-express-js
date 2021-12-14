'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'ratings',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          rating_user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          weet_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'weets',
              key: 'id'
            }
          },
          score: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
              min: -1,
              max: 1
            }
          }
        },
        { transaction }
      );
      await queryInterface.addIndex('ratings', ['rating_user_id', 'weet_id'], {
        unique: true,
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: async queryInterface => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('ratings', { transaction });
      await queryInterface.removeIndex('ratings', ['rating_user_id', 'weet_id'], { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
