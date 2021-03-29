'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, {foreignKey: 'userId'})
    Booking.hasMany(models.Review, {foreignKey: 'bookingId'})
  };
  return Booking;
};
