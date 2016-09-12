import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class ChartsService{
	constructor(){
	  this.url =constants.URL+"stats/";

	}
	getCountries(){
	  return fetch (`${this.url}countries`, constants.cookieMarker).then(res=>{
	  	let retData = res.json();
	  	//console.log('getCountries(): ', retData);
	  	return retData;
	  	//res.json()
	  });

	}

	getTags(){
	  return fetch (`${this.url}tags`, constants.cookieMarker).then(res=>{
	  	let retData = res.json();
	  	//console.log('getTags(): ', retData);
	  	return retData;
	  });

	}
	getTechs(){
	  return fetch (`${this.url}technologies`, constants.cookieMarker).then(res=>{
	  	let retData = res.json();
	  	//console.log('getTechs(): ', retData);
	  	return retData;
	  	//res.json()
	  });

	}
	getProjsByStartDate(){
	  return fetch (`${this.url}dates/start`, constants.cookieMarker).then(res=>{
	  	let retData = res.json();
	  	return retData;
	  	//res.json()
	  });
	}

	getProjsByEndDate(){
	  return fetch (`${this.url}dates/end`, constants.cookieMarker).then(res=>{
	  	let retData = res.json();
	  	return retData;
	  	//res.json()
	  });
	}
}

const ChartService = new ChartsService();
export default ChartService;
