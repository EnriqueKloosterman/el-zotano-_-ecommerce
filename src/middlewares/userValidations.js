const session = require('express-session');
const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
    body('name')
        .notEmpty()
        .withMessage('Debes ingrersar un nombre.')
        .bail()
        .isLength({ min: 3, max: 75 })
        .withMessage('El nombre debe tener por lo menos 3 caracteres.'),
    body('lastName')
        .notEmpty()
        .withMessage('Debes ingrersar un apellido.')
        .bail()
        .isLength({ min: 3, max: 75 })
        .withMessage('El apellido debe tener por lo menos 3 caracteres.'),
    body('email')
        .notEmpty()
        .withMessage('Debes ingresar una dirección de correo.')
        .bail()
        .isEmail()
        .withMessage('El correo debe tener un formato de mail valido.'),
    body('password')
        .notEmpty()
        .withMessage('Ingresa una contraseña.')
        .bail()
        .isLength({ min: 8, max: 20})
        .withMessage('La contraseña debe tener entre 8 y 20 caracteres.'),
    body('city')
        .notEmpty()
        .withMessage('Ingresa el nobre de tu ciudad.')
        .bail()
        .isLength({ min: 2, max: 100})
        .withMessage('debe contener al menos 2 caracteres.'),
    body('address')
        .notEmpty()
        .withMessage('Ingresa tu dirección.')
        .bail()
        .isLength({ min: 2, max: 100})
        .withMessage('Debe contener al menos 2 caracteres.'),
    body('number')
        .notEmpty()
        .withMessage('Bebes ingrersar un numero.')
        .bail()
        .isLength({ min: 1 , max: 7})
        .withMessage('Debes ingrersar al menos un numero.'),

    body('postalCode')
        .notEmpty()
        .withMessage('Ingresa tu codigo postal')
        .bail()
        .isLength({ min: 3, max: 20 })
        .withMessage('Ingresa al menos 3 caracteres.'),
    body('image').custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtension = ['.jpg', '.png', '.gif'];
        if(!file){
            throw new Error('Tienes que subir una imagen.');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtension.includes(fileExtension)){
                throw new Error(`los archivos deben ser de tipo ${acceptedExtension.join(', ')}`)
            }
        }
        return true;
    })
]

module.exports = validations;