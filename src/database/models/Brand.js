module.exports = (sequelize, DataTypes) => {
    const alias = 'Brand';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        }
    };
    
    const config = {
        tableName: 'brand'
    };

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = models => {
        Brand.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'tag_id'
        });
    }
    return Brand;
}