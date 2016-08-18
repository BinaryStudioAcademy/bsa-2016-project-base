/**
 * Created by user on 18.08.2016.
 */

var Docxtemplater = require('docxtemplater');
var func = function(message){
    var doc = new Docxtemplater(message.template);
    doc.setData(message.data);
    doc.render();
    var buf = doc.getZip().generate({type: "nodebuffer"});
    process.send(buf);
};
process.on('message', func);
