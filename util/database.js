const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'santosh','Password123!@#',
    {dialect:'mysql',host:'localhost'}
    );

module.exports =  sequelize;