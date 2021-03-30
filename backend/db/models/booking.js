'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    location: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    pic: DataTypes.BLOB,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, {foreignKey: 'userId'})
    Booking.hasMany(models.Review, {foreignKey: 'bookingId'})
  };
  return Booking;
};
