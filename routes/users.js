//modulos a utilizar
const express = require('express');
const router = express.Router();
const sendgrid = require('../config/sendgrid');
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport'); //plugin para nodemailer y hacer posible el envio del correo por sendgrid

const User = require('../models/user');

//datos de la cuenta de sendgrid
var options = {
	auth: {
		api_user: sendgrid.user, 
		api_key: sendgrid.password 
	}
}

var client = nodemailer.createTransport(sgTransport(options));

// ruta de registro
router.post('/register', (req, res, next) => {
 let newUser = new User({
 	email: req.body.email
 });

 User.addUser(newUser, (err, user) => {
 	var x = 0;

//fechas de entrega de correos
//el formato de fecha es año/mes (0-11)/día/hora/minuto/segundo
 	var date = new Date(2017, 5, 29, 14, 23, 0);
 	var date2 = new Date(2017, 5, 29, 14, 24, 0);
 	var date3 = new Date(2017, 5, 29, 14, 25, 0);

 	if(err) {
 		res.json({success: false, msg:'No se pudo registrar el usuario'});
 	} else {
 		x =  x+1;
 		//diseño correo agradecimiento
 		var email = {
			from: 'Localhost Staff, staff@localhost.com',
			to: user.email,
			subject: 'Correo de prueba',
			text: 'Hola, este es un correo de prueba',
			html: ''
		};

		client.sendMail(email, function(err, info) {
			if (err) console.log('ERROR');
		});
		
		//diseño promo 1
		var email2 = {
			from: 'Localhost Staff, staff@localhost.com',
			to: user.email,
			subject: 'Correo de prueba2',
			text: 'Hola, este es un segundo correo de prueba',
			html: ''
		};
		//diseño promo 2
		var email3 = {
			from: 'Localhost Staff, staff@localhost.com',
			to: user.email,
			subject: 'Correo de prueba3',
			text: 'Hola, este es un tercer correo de prueba',
			html: ''
		};
		//diseño promo 3
		var email4 = {
			from: 'Localhost Staff, staff@localhost.com',
			to: user.email,
			subject: 'Correo de prueba4',
			text: 'Hola, este es un cuarto correo de prueba',
			html: ''
		};
		
		//envio de promos
		if (x > 0) {
			var j = schedule.scheduleJob(date, function() {
				console.log('A la 2:23 del jueves 29');
				client.sendMail(email2, function(err, info) {
					if (err) console.log('ERROR');
				});
			});

			var j = schedule.scheduleJob(date2, function() {
				console.log('A la 2:24 del jueves 29');
				client.sendMail(email3, function(err, info) {
					if (err) console.log('ERROR');
				});
			});

			var j = schedule.scheduleJob(date3, function() {
				console.log('A la 2:25 del jueves 29');
				client.sendMail(email4, function(err, info) {
					if (err) console.log('ERROR');
				});
			});

		}

		res.json({success: true, msg:'Se registro el usuario'});
 	}
 });
});

module.exports = router;