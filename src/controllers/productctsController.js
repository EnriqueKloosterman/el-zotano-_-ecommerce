const express = require('express');
const db = require('../database/models');
const sequelize = db.Sequelize;
const path = require('path');

const productsController = {

    //todo      ******  vista de la creación de productos    ******
    createProductView: async (req, res) => {
        let brandDB = await db.Brand.findAll({
                order: [['name', 'ASC']]
        })
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)})
        let manufactorerDB = await db.Manufactorer.findAll({
            order: [['name', 'ASC']]
        })
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)})
        let tagDB = await db.Tag.findAll({
            order: [['name', 'ASC']]
        })
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)})
        
        return res.render('pages/admin/createProduct',{
            brandDB, manufactorerDB, tagDB,
            style: "/css/style.css",
            user: req.session.userLogged,
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
    //todo      ****** Vista de Agregar nuevo Tag   ******
    addNewTagView: async(req, res) => {
        return res.render('pages/admin/addNewTag',{
            style: "/css/style.css",
            user: req.session.userLogged,
        }
        
        )
    },
    //todo      ****** Agregar nuevo Fabricante    ******
    addNewManufactorer: async (req, res) => {
        await db.Manufactorer.create({
            name: req.body.manufactorer
        });
        res.redirect('/admin/create-product/');
    },
    //todo      ****** Agregar nuevo TAG    ******
    addNewTag: (req, res) =>{
        try{
            db.Tag.create({
                name: req.body.tag,
            });
            res.redirect('/admin/create-product/');
        }
        catch(err){
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }
    },
    //todo      ****** Agregar nueva Marca      ******
    addNewBrand: (req, res) => {
        db.Brand.create({
            name: req.body.brand
        })
        res.redirect('/admin/create-product/');
    },
//todo      ******  Vista de edicón de productos    ******
    editProductVIew: async(req, res) => {
        let id = req.params.id;
        let brandDB = await db.Brand.findAll({
            order: [['name', 'ASC']]
        })
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)});
        let manufactorerDB = await db.Manufactorer.findAll({
            order: [['name', 'ASC']]
        })
            .catch((err) => 
                {console.log(`la cagaste en ${err}`)});
        let tagDB = await db.Tag.findAll({
            order: [['name', 'ASC']]
        })
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
            user: req.session.userLogged,
            style: "/css/style.css",
            script: "/js/productsForms.js"
        })
    },

    //todo      ****** Modificación de productos    *****
    updateProducts: async (req, res) => {
        try{
            let id = req.params.id;
            await db.Products.update({
                name: req.body.name,
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
    //todo      ******  Vista del detalle del producto   ******
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
                user: req.session.userLogged,
            })
        } 
        catch(err) {
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }
    },
    //todo      ****** Vista del panel de administrador ******
    adminPanelView: async (req, res) => {
        await res.render('pages/admin/adminPanelView',{
            style: "/css/style.css",
            user: req.session.userLogged,
        })
    },
    //todo      ****** VIsta de la lista de productos   ******
    productsList: async(req, res) => {
        //*     ****** paginacion   ******
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber= Number.parseInt(req.query.size);

        let page = 0;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
            page = pageAsNumber;
        }
        let size = 10;
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 12){
            size = sizeAsNumber;
        }

        let product = await db.Products.findAndCountAll({
            distinct: true,
            limit: size,
            offset: page * size,
            page: page,
            include: ['image']
        })



        res.render('pages/admin/productListView', {
            user: req.session.userLogged,
            style: "/css/style.css",
            product: product.rows,
            page: page,
            totalPages: Math.ceil(product.count /size),
            size: size
        } )
    },
    //todo      ****** vista de colleciones ******
    brandCollection: async (req, res) => {
        const brand = await db.brand.findAll();
        return await res.render('pages/products/brand',{
            user: req.session.userLogged,
            style: "/css/style.css",
            brand: brand
        })
    },

    //todo      ****** vista de la productos por collecciones ******
    brandSelected: async (req, res) => {
        const brand = req.params.brand;
    
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber= Number.parseInt(req.query.size);
        let page = 0;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ){
            page = pageAsNumber;
        }
        let size = 16;
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 20){
            size = sizeAsNumber;
        }
        let brandToShow;
        let showProducts;
        
        try{
            brandToShow = await db.Brand.findOne({
                where: {
                    name: brand,
                }
            })
        }
        catch(err) {
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }
        try{
            showProducts = await db.Products.findAndCountAll({
                limit: size,
                distinct: true,
                offset: page * size,
                page: page,
                include: ['image'],
                where: {
                    brand_id : brandToShow.id
                }
            })
        }
        catch(err) {
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }
    
        return await res.render('pages/products/showProducts', {
            user: req.session.userLogged,
            style: "/css/style.css",
            showProducts: showProducts.rows,
            brand: brandToShow,
            totalPages: Math.ceil(showProducts.count / size),
            size: size,
            // page: page
        })
    
    },

    //todo      ****** vista de tag ******
    productTag: async (req, res) => {
        const tag = await db.Tag.findAll();
        return await res.render('pages/products/tag',{
            user: req.session.userLogged,
            style: "/css/style.css",
            tag: tag
        })
    },

    //todo      ****** vista de la productos por tag ******
    tagSelected: async (req, res) => {
        const tag = req.params.tag;

        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber= Number.parseInt(req.query.size);
        let page = 0;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ){
            page = pageAsNumber;
        }
        let size = 16;
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 20){
            size = sizeAsNumber;
        }
        let tagToShow;
        let showProducts;
        
        try{
            tagToShow = await db.Tag.findOne({
                where: {
                    name: tag,
                }
            })
        }
        catch(err) {
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }
        try{
            showProducts = await db.Products.findAndCountAll({
                limit: size,
                distinct: true,
                offset: page * size,
                page: page,
                include: ['image'],
                where: {
                    tag_id : tagToShow.id
                }
            })
        }
        catch(err) {
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }

        return await res.render('pages/products/showProducts', {
            user: req.session.userLogged,
            style: "/css/style.css",
            showProducts: showProducts.rows,
            tag: tagToShow,
            totalPages: Math.ceil(showProducts.count / size),
            size: size,
            // page: page
        })

    },









}


module.exports = productsController;

