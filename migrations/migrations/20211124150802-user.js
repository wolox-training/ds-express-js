'use strict';

const ROLES = require('../../app/constants/roles');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM,
      values: Object.values(ROLES),
      defaultValue: ROLES.REGULAR,
      allowNull: false
    }),

  down: queryInterface => queryInterface.removeColumn('users', 'role')
};
