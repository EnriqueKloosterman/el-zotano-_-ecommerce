const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const alias = 'Products';
    
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        discount: {
            type: DataTypes.INTEGER,
        }
    };
    
    const config = {
        tableName: 'products'
    };
    
    const Products = sequelize.define(alias, cols, config);
    
    Products.associate = models => {
        Products.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: 'brand_id',
        });
        Products.belongsTo(models.Manufactorer, {
            as: 'manufactorer',
            foreignKey: 'manufactorer_id'
        });
        Products.belongsTo(models.Tag, {
            as: 'tag',
            foreignKey: 'tag_id'
        });
        Products.hasMany(models.Image, {
            as: 'image',
            foreignKey: 'product_id'
        });
        Products.hasMany(models.Description, {
            as: 'description',
            foreignKey: 'product_id'
        });
        Products.hasMany(models.Details, {
            as: 'details',
            foreignKey: 'product_id'
        })
    };
    return Products
}

