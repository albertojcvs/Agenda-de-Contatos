const { Model, DataTypes } = require('sequelize');

class Contact extends Model {

    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            whatsapp: DataTypes.STRING,
            instagram: DataTypes.STRING,
        },{
            sequelize
        });
    }
}

module.exports = Contact;