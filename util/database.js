const { Sequelize } = require('sequelize');

const mySequelize = new Sequelize('node-complete', 'santosh','Password123!@#',
    {dialect:'mysql',host:'localhost'}
    );

module.exports =  mySequelize;