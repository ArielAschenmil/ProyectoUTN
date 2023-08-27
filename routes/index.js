var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModels = require('../models/novedadesModels');

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  var novedades = await novedadesModels.getNovedades()
  
  res.render('index', {
    novedades
  });
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var tel = req.body.tel;

  var obj = {
    to: 'arielasche@gmail.com',
    subjet: 'Contacto desde la web',
    html: nombre + " se contacto por la web y quiere mas info a este correo : " + email + ". <br>" + ". <br> Su tel es : " + tel
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });
});


module.exports = router;
