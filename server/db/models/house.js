const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment, Booking }) {
      this.belongsTo(User, { foreignKey: 'hostId' });
      this.hasMany(Comment, { foreignKey: 'houseId' });
      this.hasMany(Booking, { foreignKey: 'houseId' });
    }
  }
  House.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      description: DataTypes.TEXT,
      hostId: DataTypes.INTEGER,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'House',
    },
  );
  return House;
};
