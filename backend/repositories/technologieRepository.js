/**
 * Created by razor on 03.08.16.
 */
var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Technogolie = require('../schemas/techologieSchema');

function TechnologieRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Technogolie;
}

TechnologieRepository.prototype = new Repository();

module.exports = new TechnologieRepository();