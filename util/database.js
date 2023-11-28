const Sequelize = require('sequelize');

const sequelize = new Sequelize('store-seller', 'root', 'trailing',{
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;
    