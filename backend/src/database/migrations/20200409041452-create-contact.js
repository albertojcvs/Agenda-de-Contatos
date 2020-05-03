'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('contacts', {
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull:false
       },
       name:{
         type:Sequelize.STRING,
         allowNull:false
       },
       whatsapp:{
         type:Sequelize.STRING
        },
        instagram: {
          type:Sequelize.STRING
       },
       created_at:{
         type:Sequelize.DATE,
         allowNull: false
       },
       updated_at:{
        type:Sequelize.DATE,
        allowNull: false
      }
      });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('contacts');

  }
};
