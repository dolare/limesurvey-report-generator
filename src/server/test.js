const PDFDocument = require('pdfkit');
const fs = require('fs');

console.log(1);
var doc = new PDFDocument()
doc.pipe(fs.createWriteStream('output.pdf'))

//res.download('output.pdf');
doc.font('Times-Roman')
    .fontSize(48)
    .text('NodeJs PDF Document',100,100);
doc.addPage()
   .fillColor("blue")
   .text('Here is a link!', 100, 100)
   .underline(100, 100, 160, 27, {color: "#0000FF"})
   .link(100, 100, 160, 27, 'http://google.com/')

doc.addPage()
   .fontSize(25)
   .text('Here is some vector graphics...', 100, 100)
doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill("#FF3300") 
console.log(2);  
doc.end()

