const ROLES = require('../constants/roles');
const { POSITIONS } = require('../constants/users');
const { getPosition } = require('../helpers/user');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(ROLES),
        defaultValue: ROLES.REGULAR
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      position: {
        type: DataTypes.ENUM,
        values: Object.values(POSITIONS),
        defaultValue: POSITIONS.DEVELOPER
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true,
      underscored: true,
      hooks: {
        beforeUpdate: user => {
          user.position = getPosition(user.score);
        }
      }
    }
  );

  User.associate = ({ Weet }) => {
    User.hasMany(Weet, { as: 'weets' });
  };
  return User;
};
