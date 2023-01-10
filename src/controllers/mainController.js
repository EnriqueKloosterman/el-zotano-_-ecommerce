const express = require('express');
const path = require('path');
const db = require('../database/models');
const Sequelize = db.Sequelize;


const mainController = {
    // todo     ****** vista del home ******
    index: async (req, res) =>{

        const newArrivals = await db.Products.findAll({
            include:["image", "brand", "tag", "manufactorer"],
            order:[["id", "DESC"]],
            limit: 8,
        })

        const brands = await db.Brand.findAll({
            // order: [['id','RANDOM()']],
            order: Sequelize.literal('rand()'),
            limit: 5,
        })


        await res.render('pages/index', {
            newArrivals, brands,
            user: req.session.userLogged,
            style: "/css/style.css",
        })
    },
}

module.exports = mainController;