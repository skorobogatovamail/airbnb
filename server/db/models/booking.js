const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Entry }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Entry, { foreignKey: 'entryId' });
    }
  }
  Booking.init(
    {
      userId: DataTypes.INTEGER,
      entryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Booking',
    },
  );
  return Booking;
};
