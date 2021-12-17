'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'min_token', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Date.now()
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'min_token')
};
