module.exports = (sequelize, DataTypes) => {
    const alias = 'Tag';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        }
    };
    
    const config = {
        tableName: 'tag'
    };

    const Tag = sequelize.define(alias, cols, config);

    Tag.associate = models => {
        Tag.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'tag_id'
        });
    }
    return Tag
}