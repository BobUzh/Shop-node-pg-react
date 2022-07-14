const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    username: {type: DataTypes.STRING, required: true},
    first_name: {type: DataTypes.STRING, required: true},
    last_name: {type: DataTypes.STRING, required: true},
    activationLink: {type: DataTypes.STRING},
    isActivated: {type: DataTypes.STRING}
},{
    getterMethods: {
        dto() {
            return {id:this.id, email:this.email, username:this.username};
        }
}});

const UserToken = sequelize.define('user_token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER},
    token: {type: DataTypes.STRING}
});

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    category_id: {type: DataTypes.STRING},
    price: {type: DataTypes.FLOAT},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false}
});

const OrderDetail = sequelize.define('order_detail', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    product_id: {type: DataTypes.INTEGER},
    order_id: {type: DataTypes.INTEGER},
    quantity:{type: DataTypes.INTEGER}
});


const ProductCategory = sequelize.define('product_category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    code: {type: DataTypes.INTEGER},
    parent_code: {type: DataTypes.INTEGER}
});

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER},
    status: {type: DataTypes.INTEGER},
});

User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(UserToken);
UserToken.belongsTo(User);

Product.belongsTo(ProductCategory);
ProductCategory.hasMany(Product);

Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);

OrderDetail.hasOne(Product);
Product.belongsTo(OrderDetail);

module.exports = {
    User,
    UserToken,
    Order,
    Product,
    ProductCategory,
    OrderDetail,
};