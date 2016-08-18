/**
 * Created by user on 18.08.2016.
 */

const computecluster = require('compute-cluster');
var cluster = new computecluster({module: "backend/service/documents/docxGeneratorWorker.js"});
module.exports = {
    generate: function (data, template, callback) {
        cluster.enqueue({template, data}, callback)
    }
};