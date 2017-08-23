import express from 'express'
const PDFGenerator = require('./PDFGenerator')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Promise = require('bluebird')

const router = express.Router()

router.post('/generate', function(req, res) { 
  var user = req.body.userInfo;
  console.log(user);
  console.log(user.name);
  var name = user.name;
  var school = user.school;
  var id = user.id;
  var time = user.time;
  var email = user.email;
  var province = user.province;
  var city = user.city;
  var answer = req.body.answer;
  
  PDFGenerator(time,name,school,id,email,answer,province,city).then(function(stream){
    stream.on('finish', function(){
        console.log('stream finished');
        res.send('success');
    })
  },function(err){
    console.log(err);
  });
})

router.post('/chart', function(req, res) {
  var base64Data = req.body.data.dataURL.replace(/^data:image\/png;base64,/,"");
  fs.writeFile(__dirname + '/chart.png', base64Data, 'base64', function(err) {
    console.log(1);
    res.send('success');
  })
  console.log(2);
})

router.get('/download/:email', function(req, res, next) {
  res.download(__dirname + '/output.pdf', req.params.email + '.pdf')
})


export default router