/**
 * Created by razor on 03.08.16.
 */
var Repository = require('./generalRepository');
var Technology = require('../schemas/techologySchema');

function TechnologyRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Technology;
}


TechnologyRepository.prototype = new Repository();
// TechnologieRepository.prototype.deleteMany = function(array, callback){
//     var model = this.model;
//     for(var i = 0; i < array.length; i++) {
//         var query = model.remove({_id:array[i]});
//         query.exec(callback);
//     }
// };
module.exports = new TechnologyRepository();