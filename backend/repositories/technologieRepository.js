/**
 * Created by razor on 03.08.16.
 */
var Repository = require('./generalRepository');
var Technogolie = require('../schemas/techologieSchema');

function TechnologieRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Technogolie;
}


TechnologieRepository.prototype = new Repository();
// TechnologieRepository.prototype.deleteMany = function(array, callback){
//     var model = this.model;
//     for(var i = 0; i < array.length; i++) {
//         var query = model.remove({_id:array[i]});
//         query.exec(callback);
//     }
// };
module.exports = new TechnologieRepository();