import React, { Component, PropTypes } from 'react';
import {Grid, Col, Row} from "react-bootstrap"
class TechTab extends Component {
	constructor(props) {
	    super(props);
		this.searchInputChangeHandler =
				this.searchInputChangeHandler.bind(this);
		this.removeSelectedButtonClickHandler =
				this.removeSelectedButtonClickHandler.bind(this)
	}
	checkBoxChangeHandler(key){
		this.props.toggleTechSelect(this.props.store.TechAdminReducer.techs[key]);
	}
	searchInputChangeHandler(e){
		this.props.modifySearchPattern(e.target.value)
	}
	removeSelectedButtonClickHandler(){
		this.props.removeSelectedTechs()
	}

	initAddAction(){
		console.log("init add tag action")
		console.log("store = " + JSON.stringify(this.props.store))
		this.props.addTech({techName: "test tech"})
	}
	getTechComponents(){     //dont working without .TechAdminReducer
		return this.props.store.TechAdminReducer.techs.map((tech, index)=>(
			<Col md={4} key={index}>
				<input type="checkbox" checked={tech.isSelected}
					   onChange={this.checkBoxChangeHandler.bind(this, index)}/>
				<img src="http://strojekodom.ru/images/ikons_menu/technology2.png"/>
				<span>{tech.techName}</span>
				<small>{tech.techDescription}</small>
			</Col>
		))
	};
	getTechComponentRows(colsInRow=3){
		let techComponents = this.getTechComponents();
		let rows = [];
		for (let i = 0; i < techComponents.length; i +=colsInRow){
			let cols = [];
			for (let j = 0; j < colsInRow&&i+j<techComponents.length; j++){
				cols.push(techComponents[i+j])
			}
			rows.push(<Row key={i/3} className="show-grid">{cols}</Row>)
		}
		return rows;
	}
 	render() {
	    return (
	    	<div className="techTab">
				<h2>Add/Edit Technologies</h2>
				<input placeholder="Search"
					   value={this.props.store.searchPattern}
					   onChange={this.searchInputChangeHandler}/>
				<button onClick={this.initAddAction.bind(this)}>
					Init add tag action (for test add action)
				</button>
				<button onClick={this.removeSelectedButtonClickHandler}>
					Remove selected
				</button>
				<Grid>
					{this.getTechComponentRows()}
				</Grid>
	    	</div>
	    )
	}
}
//connect
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "./../../actions/admin/TechAdminActions"
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		store: state
	};
}

let TechTabConnected = connect(mapStateToProps, mapDispatchToProps)(TechTab);
/*TechTab.propTypes = {
	tech: PropTypes.array.isRequired,
  	addTech: PropTypes.func.isRequired,
  	removeTech: PropTypes.func.isRequired
};*/
export default TechTabConnected;
