module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  Weet.associate = ({ User, Rating }) => {
    Weet.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Weet.hasMany(Rating, { foreignKey: 'weetId', as: 'rating' });
  };

  return Weet;
};
