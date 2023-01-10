const express = require('express');
const path = require('path');
const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersController = {
    //?     ****** Vista de la pagina de registro de usuarios   ******
    registerView: async (req, res) => {
        res.render('pages/user/createUser',{
            style: "/css/style.css",
        })
    },
    //?     ****** Creación de usarios  ******
    createNewUser: async(req, res) => {
        const validations = validationResult(req);

        if(validations.errors.length > 0){
            return res.render('pages/user/createUser',{
                user: req.session.userLogged,
                style: "/css/style.css",
                errors: validations.mapped(),
                oldData: req.body
            })
        }
        const mail = req.body.email;
        const userInDb = await db.Users.findOne({
            where: {
                email: mail
            }
        });
        if(userInDb){
            return res.render('pages/user/createUser',{
                style: "/css/style.css",
                errors: {
                    email: {
                        msg: 'La dirección de correo ulizada ya se encuetra registrada'
                    }
                },
                oldData: req.body
            })
        }

        try {
            await db.Users.create({
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                city: req.body.city,
                address: req.body.address,
                number: req.body.number,
                postalCode: req.body.postalCode,
                avatar: req.file ? req.file.filename : '',
                role: 2
            });
            res.send('usuario creado')
        } 
        catch(err){
            res.send(`la cagaste en ${err}, zoquete!!`);
            console.log(`la cagaste en ${err}, zoquete!!`);
        }
            
    },
    //?     ****** vista de Login   ******
    loginView: async (req, res) =>{
        res.render('pages/user/logUser',{
            style: "/css/style.css",
        })
    },
    //?     ****** Login de usarios ******
    logUser: async (req, res) => {
        // return res.send(req.body)
        let email = req.body.email;
        let userToLogin = await db.Users.findOne({
            where: {
                email: email
            }
        })

        if(userToLogin){
            const passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(passwordOk){
                delete userToLogin.password;
                req.session.userLogged = userToLogin; 
                if(req.body.rememberUser){
                    res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 24})
                }
                // return res.send(userToLogin);
                return await res.redirect('/')
            }
        }
        return res.render('pages/user/logUser',{
            // title: 'Home Run',
            style: '../css/style.css',
            errors:{
                email:{
                    msg: 'no se encuntra en la db'
                }
            }
        })
    },
    //?     ****** LogOut de usuarios ******
    logout: async (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy();
        return await res.redirect('/');
    },
    //?     ****** User Profile View ******
    userProfile: async (req, res) => {
        return await res.render('pages/user/userProfile', {
            style: '../css/style.css',
            user: req.session.userLogged,
        }) 
    },
    //?     ****** User Profile Edit ******
    userProfileEdit: async (req, res) => {
        const user = req.session.userLogged
        const userToEdit = await db.Users.findOne({
            where:{
                id: user.id
            }
        });
        return await res.render('pages/user/userProfileEdit',{
            userToEdit,
            user,
            style: "/css/style.css",
        })
    }


}


module.exports = usersController;