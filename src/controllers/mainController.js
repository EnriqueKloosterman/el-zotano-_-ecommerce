const express = require('express');
const path = require('path');


const mainController = {
    // todo     ****** vista del home ******
    index: async (req, res) =>{
        await res.render('pages/index', {
            user: req.session.userLogged,
            style: "/css/style.css",
        })
    }
}

module.exports = mainController;