module.exports = (sequelize, DataTypes) => {
    const alias = 'Manufactorer'
    
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING,
        }
    };
    
    const config = {
        tableName: 'manufactorer',
    };
    
    const Manufactorer = sequelize.define( alias, cols, config);
    
    Manufactorer.associate = models => {
        Manufactorer.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'manufactorer_id'
        })
    }
    return Manufactorer;
}

