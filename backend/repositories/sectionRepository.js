
var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Section = require('./../schemas/sectionSchema');
function SectionRepository(){
    Repository.prototype.constructor.call(this);
    this.model = Section;
}

SectionRepository.prototype = new Repository();

module.exports = new SectionRepository();