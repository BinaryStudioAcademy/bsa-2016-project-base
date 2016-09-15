var Projects = require('../schemas/projectSchema');
var Tags = require('../schemas/tagSchema');
var Techs = require('../schemas/technologySchema');


class StatService {

	getProjectsCountriesStat(req, callback){
		//console.log('getProjectsCountriesStat() called.');
		Projects.aggregate([{"$group" : {_id:"$contacts.countryName", count:{$sum:1}}}]).exec(callback);

		//callback(null, countriesDistribution);
	}

	getProjectsTagsStat(req, callback){
		Projects.aggregate([{$unwind: "$tags"}, {$group: {_id: "$tags", count:{$sum:1}}}, {$sort: {count: -1}}])
			.exec((err, result)=>{
				Tags.populate(result, {path: '_id'}, function(err2, tagsResult){
					console.log(tagsResult);
					let returnObj = [];
					tagsResult.forEach((tagElem, ind, arr) =>{
						returnObj.push({
							tagName: (tagElem._id.tagName)? tagElem._id.tagName : 'No tags',
							count: tagElem.count
						});
					});
					callback(null, returnObj);
				});
			});
		
	}

	getProjectsTechsStat(req, callback){
		Projects.aggregate([{$unwind: "$technologies"}, {$group: {_id: "$technologies", count:{$sum:1}}}, {$sort: {count: -1}}])
			.exec((err, result)=>{
				Techs.populate(result, {path: '_id'}, function(err2, techsResult){
					//console.log(tagsResult);
					let returnObj = [];
					techsResult.forEach((techElem, ind, arr) =>{
						returnObj.push({
							techName: (techElem._id.techName)? techElem._id.techName : 'No techs',
							count: techElem.count
						});
					});
					callback(null, returnObj);
				});
			});
		
	}

	getProjectsDatesStart(req, callback){
		Projects.aggregate([{$project: {projectName: 1, timeBegin: 1, timeEnd: 1}}, {$sort: {timeBegin: 1}}])
			.exec((err, result)=>{
				let datesBounds = this.locGetDateBoundsStart(result);
				let monthIntervals = this.locGetMonthIntervals(datesBounds.startMonth, datesBounds.endMonth);
				let projIntervals = this.locGetProjIntervalsByStartDate(result, monthIntervals);
				const {cummulatIntervals, cummulativeCount} = this.locCummulativeRecountInIntervals(projIntervals);
				//datesBounds.monthIntervals = monthIntervals;
				//datesBounds.projIntervals = projIntervals;
				let labels = [this.locGetDateLabel(cummulatIntervals[0].dateFrom)].concat(cummulatIntervals.map(elem=>this.locGetDateLabel(elem.dateTo)));
				let data = [0].concat(cummulatIntervals.map(elem=>elem.count));
				//console.log(`labels length ${labels.length}`);
				//console.log(`data length ${data.length}`);
				//datesBounds.cummulatIntervals = cummulatIntervals;
				datesBounds.labels = labels;
				datesBounds.data = data;
				//datesBounds.projCounted = cummulativeCount;
				callback(null, datesBounds);
			});
	}

	getProjectsDatesEnd(req, callback){
		Projects.aggregate([{$match: {status : {$eq: "Completed"}}}, {$project: {projectName: 1, timeBegin: 1, timeEnd: 1}}, {$sort: {timeEnd: 1}}])
			.exec((err, result)=>{
				let datesBounds = this.locGetDateBoundsEnd(result);
				let monthIntervals = this.locGetMonthIntervals(datesBounds.startMonth, datesBounds.endMonth);
				let projIntervals = this.locGetProjIntervalsByEndDate(result, monthIntervals);
				const {cummulatIntervals, cummulativeCount} = this.locCummulativeRecountInIntervals(projIntervals);
				//datesBounds.monthIntervals = monthIntervals;
				//datesBounds.projIntervals = projIntervals;
				let labels = [this.locGetDateLabel(cummulatIntervals[0].dateFrom)].concat(cummulatIntervals.map(elem=>this.locGetDateLabel(elem.dateTo)));
				let data = [0].concat(cummulatIntervals.map(elem=>elem.count));
				//console.log(`labels length ${labels.length}`);
				//console.log(`data length ${data.length}`);
				//datesBounds.cummulatIntervals = cummulatIntervals;
				datesBounds.labels = labels;
				datesBounds.data = data;
				//datesBounds.projCounted = cummulativeCount;
				callback(null, datesBounds);
			});
	}

	locGetDateLabel(date){
		return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
	}

	locGetDateBoundsStart(result){
		let datesBounds = {};
		let timeOffset = new Date().getTimezoneOffset();
		let startMonth = new Date(result[0].timeBegin.getFullYear(), (result[0].timeBegin.getDate() == 1)? (result[0].timeBegin.getMonth()): (result[0].timeBegin.getMonth() - 1), 1, 0, 0 - timeOffset, 0, 0);
		//console.log('startMonth: ', startMonth);
		let endMonth = new Date(result[result.length - 1].timeBegin.getFullYear(), result[result.length - 1].timeBegin.getMonth() + 1, 1, 0, 0 - timeOffset, 0, 0);
		datesBounds.startMonth = startMonth;
		datesBounds.endMonth = endMonth;
		return datesBounds;
	}

	locGetDateBoundsEnd(result){
		let datesBounds = {};
		let timeOffset = new Date().getTimezoneOffset();
		let startMonth = new Date(result[0].timeEnd.getFullYear(), (result[0].timeEnd.getDate() == 1)? (result[0].timeEnd.getMonth()): (result[0].timeEnd.getMonth() - 1), 1, 0, 0 - timeOffset, 0, 0);
		//console.log('startMonth: ', startMonth);
		let endMonth = new Date(result[result.length - 1].timeEnd.getFullYear(), result[result.length - 1].timeEnd.getMonth() + 1, 1, 0, 0 - timeOffset, 0, 0);
		datesBounds.startMonth = startMonth;
		datesBounds.endMonth = endMonth;
		datesBounds.projList = result;
		return datesBounds;
	}

	locGetMonthIntervals(currentDate, endMonth){
		let monthIntervals = [];
		while (currentDate < endMonth){
			monthIntervals.push(currentDate);
			currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
		}
		return monthIntervals;
	}

	locGetProjIntervalsByStartDate(result, monthIntervals){
		let projIntervals = [];
		for (let intCount = 0; intCount < monthIntervals.length - 1; intCount++){
			let inInterval = result.filter(proj => {
				return (proj.timeBegin >= monthIntervals[intCount] && proj.timeBegin < monthIntervals[intCount + 1]);
			}).length;
			//console.log('inInterval: ', inInterval);
			projIntervals.push({
				dateFrom: monthIntervals[intCount],
				dateTo: monthIntervals[intCount + 1],
				count: inInterval
			});
		}
		return projIntervals;
	}

	locGetProjIntervalsByEndDate(result, monthIntervals){
		let projIntervals = [];
		for (let intCount = 0; intCount < monthIntervals.length - 1; intCount++){
			let inInterval = result.filter(proj => {
				return (proj.timeEnd >= monthIntervals[intCount] && proj.timeEnd < monthIntervals[intCount + 1]);
			}).length;
			//console.log('inInterval: ', inInterval);
			projIntervals.push({
				dateFrom: monthIntervals[intCount],
				dateTo: monthIntervals[intCount + 1],
				count: inInterval
			});
		}
		return projIntervals;
	}

	locCummulativeRecountInIntervals(projIntervals){
		let cummulatIntervals = [].concat(projIntervals);
		//console.log(`cummulatIntervals: ${cummulatIntervals}`);
		let cummulativeCount = projIntervals.reduce((cnt, curr, ind, arr) => {
			let cntSum = cnt + curr.count;
			cummulatIntervals[ind].count = cntSum;
			//console.log(`cummulatIntervals[${ind}]: ${cummulatIntervals[ind]}`);
			return cntSum;
		}, 0);
		return {cummulatIntervals, cummulativeCount};
	}
}

const statService = new StatService();
module.exports = statService;