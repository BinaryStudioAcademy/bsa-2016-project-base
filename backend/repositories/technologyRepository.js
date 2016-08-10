/**
 * Created by razor on 03.08.16.
 */
var Repository = require('./generalRepository');
var Technology = require('../schemas/technologySchema');

function TechnologyRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Technology;
}


TechnologyRepository.prototype = new Repository();
module.exports = new TechnologyRepository();