module.exports = (sequelize, DataTypes) => {
    const alias = "Details";
    const cols ={
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        detail: {
            type: DataTypes.STRING,
        }
    };

    const config = {
        tableName: "details"
    };

    const Details = sequelize.define(alias, cols, config);

    Details.associate = (models) => {
        Details.belongsTo(models.Products, {
            as: 'products',
            foreignKey: 'product_id'
        })
    }
    return Details;
}