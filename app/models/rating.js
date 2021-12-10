module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ratingUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weetId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -1,
          max: 1
        }
      }
    },
    {
      timestamps: false,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['ratingUserId', 'weetId']
        }
      ]
    }
  );

  Rating.associate = ({ User, Weet }) => {
    Rating.belongsTo(User, { foreignKey: 'ratingUserId', as: 'user' });
    Rating.belongsTo(Weet, { foreignKey: 'weetId', as: 'weet' });
  };

  return Rating;
};
