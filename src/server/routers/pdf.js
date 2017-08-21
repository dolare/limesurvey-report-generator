import express from 'express'
const PDFGenerator = require('./PDFGenerator')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Promise = require('bluebird')

const router = express.Router()

router.post('/generate', function(req, res) { 
  PDFGenerator(1,2,3,4);
  res.send('success');
})

router.post('/chart', function(req, res) {
  var base64Data = req.body.data.replace(/^data:image\/png;base64,/,"");
  fs.writeFileSync(__dirname + '/chart.png', base64Data, 'base64', function(err) {
    console.log(err);
  })
  res.send('success');

})

router.get('/download', function(req, res, next) {
  res.download(__dirname + '/output.pdf','output.pdf')
})


export default router