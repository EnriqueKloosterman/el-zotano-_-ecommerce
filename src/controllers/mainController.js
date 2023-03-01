const express = require('express');
const path = require('path');
const db = require('../database/models');
const Sequelize = db.Sequelize;

const toThousand = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const mainController = {
    // todo     ****** vista del home ******
    index: async (req, res) =>{

        const newArrivals = await db.Products.findAll({
            include:["image", "brand", "tag", "manufactorer"],
            order:[["id", "DESC"]],
            limit: 8,
        });

        // format the price of each product
        newArrivals.forEach(product => {
            product.price = toThousand(product.price);
        });
        
        const brands = await db.Brand.findAll({
            order: Sequelize.literal('rand()'),
            limit: 5,
        });

        return await res.render('pages/index', {
            newArrivals, brands,
            user: req.session.userLogged,
            style: "/css/style.css",
        });
    },
}

module.exports = mainController;