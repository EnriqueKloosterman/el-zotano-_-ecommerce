module.exports = (sequelize, DataTypes) => {
    const alias = "Description";
    const cols ={
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING
        }
    };

    const config = {
        tableName: "description"
    };

    const Description = sequelize.define(alias, cols, config);

    Description.associate = (models) => {
        Description.belongsTo(models.Products, {
            as: 'products',
            foreignKey: 'product_id'
        })
    }
    return Description;
}