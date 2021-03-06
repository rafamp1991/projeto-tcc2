'use strict';
const functions  = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const SMS = require('@ionic-native/sms');

let url = "smtps://app.home.care%40gmail.com:"+encodeURIComponent('saudedomiciliar') + "@smtp.gmail.com:465";
let transporter = nodemailer.createTransport(url);

exports.enviSMS = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
        
    this.sms.send(req.body['celular'], req.body['msgCelular']);

  });
});

exports.enviarEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let remetente = '"Rafa" <rafael.m.padua@gmail.com>';

    let assunto = req.body['assunto'];
    let destinatarios = req.body['destinatarios']; // lista de e-mails destinatarios separados por ,
    let corpo = req.body['corpo'];
    let corpoHtml = req.body['corpoHtml'];

    let email = {
        from: remetente,
        to: destinatarios,
        subject: assunto,
        text: corpo,
        html: corpoHtml
    };

    transporter.sendMail(email, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Mensagem %s enviada: %s', info.messageId, info.response);
    });
  });
});


