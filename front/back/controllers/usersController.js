const User = require('../models/user')
const bcrypt = require('bcryptjs');
//const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')


module.exports = {

  async getAll(req, res, next) {
    try {
        const data = await User.getAll();
        console.log(`Usuarios: ${data}`);
        return res.status(201).json(data);
      } 
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json(
          {
            success:false,
            message: 'error al obtener los usuarios'
          }
        );
    }
  },

  async register(req, res, next) {
    try {
      
        const user = req.body;
        const data = await User.create(user);
        
        return res.status(201).json({
            success: true,
            message: 'El registro se realiso correctamente',
            data: {
              'id': data.id
            }
        });

    } 
    catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: 'Hubo un error al registrar el usuario',
        error: error
      });
      
    }
  },

  async login(req, res, next) {
    try {
    
        const email = req.body.email;
        const password = req.body.password;

        const myUser = await User.findByEmail(email);

        if(!myUser){
          return res.status(401).json({
            success: false,
            message: 'El email no fue encontrado'
          })
        }
        const isPasswordValid = await bcrypt.compare(password, myUser.password);

        if(isPasswordValid){
          const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrkey, {
              //expiresIn:
          })
          const data = {
            id: myUser.id,
            name: myUser.name,
            lastname: myUser.lastname,
            phone: myUser.phone,
            image: myUser.image,
            session_token: `JWT ${token}`
          };

          return res.status(201).json({
            success: true,
            message: 'El usuario ha sido autenticado',
            data: data
          });
        }
        else{
          return res.status(401).json({
            success: false,
            message: 'La contraseña es incorrecta',
          });
        }
    } 


    catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: 'Hubo un error con el login del usuario',
        error: error
      });
    }
  }
};