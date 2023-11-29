const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Item = sequelize.define('Item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    itemName: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER
});

module.exports = Item;
