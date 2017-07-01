//modulos a utilizar
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

mongoose.Promise = global.Promise;

// esquema de usuario
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

//obtener usuario por su id
module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

//encriptar correo
module.exports.addUser = function(newUser, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.email, salt, (err, hash) => {
			if(err) throw err;
			newUser.save(callback);
		});
	});	
}