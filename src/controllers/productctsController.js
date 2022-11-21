const express = require('express');
const db = require('../database/models');
const sequelize = db.Sequelize;
const Op =  db.Sequelize.Op;
const path = require('path');

const productsController = {

    //todo      ******  vista de la creación de productos    ******
    createProductView: async (req, res) => {
        let brandDB = await db.Brand.findAll()
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)})
        let manufactorerDB = await db.Manufactorer.findAll()
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)})
        let tagDB = await db.Tag.findAll()
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)})
        
        return res.render('pages/admin/createProduct',{
            brandDB, manufactorerDB, tagDB,
            style: "/css/style.css",
            script: "/js/productsForms.js"

        });
    },

    //todo      ****** Creacion de productos ******
    store: async(req, res) => {
        try{
            
            const newProduct = await db.Products.create({
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                manufactorer_id: req.body.manufactorer,
                brand_id: req.body.brand,
                tag_id: req.body.tag
            });
    
            let descriptionText = [];
            for(let i = 0; i < req.body.description.length; i++){
                descriptionText.push(req.body.description[i]);
            }
            for(let i = 0; i < descriptionText.length; i++){
                await newProduct.createDescription({ description: descriptionText[i]});
            }
            let detailText = [];
            for(let i = 0; i < req.body.detail.length; i++){
                detailText.push(req.body.detail[i]);
            }
            for(let i = 0; i < detailText.length; i++){
                await newProduct.createDetail({ detail: detailText[i]});
            }
            let image= [];
            for(let i = 0; i < req.files.length; i++){
                image.push(req.files[i].filename);
            }
            for(let i = 0; i < image.length; i++){
                await newProduct.createImage({ name: image[i] });    
            }
            return res.redirect('../products/product-detail/' + newProduct.id);
        }
        catch(err){
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }
    },
//todo      ******  Vista de edicón de productos    ******
    editProductVIew: async(req, res) => {
        let id = req.params.id;
        let brandDB = await db.Brand.findAll()
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)});
        let manufactorerDB = await db.Manufactorer.findAll()
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)});
        let tagDB = await db.Tag.findAll()
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)});
        let descriptionDB = db.Description.findAll()
            .catch(err =>{
                console.log(`la cagaste en ${err}`)});
        let productToEdit = await db.Products.findByPk(id,{
            include:['brand', 'manufactorer', 'image', 'description', 'details', 'tag']
        })

        await res.render('pages/admin/editProduct',{
            productToEdit,
            brandDB, manufactorerDB, tagDB, descriptionDB,
            style: "/css/style.css",
            script: "/js/productsForms.js"
        })
    },

    //todo      ****** Modificación de productos    *****
    updateProducts: async (req, res) => {
        try{
            let id = req.params.id;
            await db.Products.update({
                name: req.body.mane,
                price: req.body.price,
                discount: req.body.discount,
                manufactorer_id: req.body.manufactorer,
                brand_id: req.body.brand,
                tag_id: req.body.tag
            },
            {
                where: {
                    id: id
                }
            });
            const editProduct = await db.Products.findByPk(id, {
                include: ['image', 'description', 'details']
            });
            await db.Details.destroy({
                where: {
                    product_id: req.params.id
                }
            });
            await db.Description.destroy({
                where:{
                    product_id: req.params.id
                }
            });
            let descriptionText = [];
            for(let i = 0; i < req.body.description.length; i++){
                descriptionText.push(req.body.description[i]);
            }
            for(let i = 0; i < descriptionText.length; i++){
                await editProduct.createDescription({ description: descriptionText[i]});
            }
            let detailText = [];
            for(let i = 0; i < req.body.detail.length; i++){
                detailText.push(req.body.detail[i]);
            }
            for(let i = 0; i < detailText.length; i++){
                await editProduct.createDetail({ detail: detailText[i]});
            }
            let image= [];
            for(let i = 0; i < req.files.length; i++){
                image.push(req.files[i].filename);
            }
            for(let i = 0; i < image.length; i++){
                await editProduct.createImage({ name: image[i] });    
            }
        
            return res.send('Por fin te salió!! Zoquete!!!')
        
        }
            catch(err) {
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }
    },
    //todo      ******  Vista del detalle del producto   *****
    productDetailView: async (req, res) => {
        try {
            let id = req.params.id;
            let brandDB = await db.Brand.findAll();
            let manufactorerDB = await db.Manufactorer.findAll();
            const tagDB = await db.Tag.findAll();
            let detailProduct = await db.Products.findByPk(id,{
                include:['image', 'details', 'description', 'brand', 'manufactorer', 'tag' ]
            });
            return res.render('pages/products/productDetail', {
                detailProduct, brandDB, tagDB, manufactorerDB,
                style: "/css/style.css",
            })
        } 
        catch(err) {
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }
    }






}


module.exports = productsController;

