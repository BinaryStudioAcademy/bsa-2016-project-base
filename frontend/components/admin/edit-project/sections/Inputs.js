import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/EditProjectActions';
import { Button, Checkbox, TextArea, DropDown, DateInput, TextInput, Editor } from '../../../common/';
import styles from './styles/Inputs.sass';

class Inputs extends Component {
    constructor(props) {
        super(props);
        this.onProjectNameChange = this.onProjectNameChange.bind(this);
        this.onProjectLinkChange = this.onProjectLinkChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onFinishDateChange = this.onFinishDateChange.bind(this);
        this.onConditionChange = this.onConditionChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
		//alert(this.props.store.projectName);
        
    }
    onProjectNameChange(e, id){
    	console.log('onProjectnameChange: ',e.target.value, id);
    	const name = e.target.value;
    	this.props.changeProjectName(name);
    }
    onProjectLinkChange(e, id){
    	console.log('onProjectLinkChange: ',e.target.value, id);
    	const link = e.target.value;
    	this.props.changeProjectLink(link);
    }
    onStartDateChange(e){
    	console.log('onStartDateChange: ',e.target.value);
    	const date = e.target.value;
    	this.props.changeStartDate(date);
    }
    onFinishDateChange(e){
    	console.log('onFinishDateChange: ',e.target.value);
    	const date = e.target.value;
    	this.props.changeFinishDate(date);
    }
    onConditionChange(e){
    	console.log('onConditionChange: ',e.target.value);
    	const option = e.target.value;
    	this.props.changeCondition(option);
    }
    onDescriptionChange(html){
    	console.log('onDescriptionChange: ',html);
    	this.props.changeDescription(html);
    }
    shouldComponentUpdate(nextProps, nextState ){
        return nextProps.conditions !== this.props.store.conditions;
    }

	formatDate(date) {
		let dd = date.getDate();
		if (dd < 10) dd = '0' + dd;
		let mm = date.getMonth() + 1;
		if (mm < 10) mm = '0' + mm;
		//let yy = date.getFullYear() % 100;
		let yy = date.getFullYear();
		if (yy < 10) yy = '0' + yy;
		return yy+ '-' + mm + '-' + dd ;
	}

    render() {
    	var {timeBegin} = this.props.store;
		var timeBeginconvert = `${new Date(timeBegin).getFullYear()}-${new Date(timeBegin).getMonth()}-${new Date(timeBegin).getDate()}`;
        const conditionOpts = [
            {value:'Estimation', name:'Estimation'},
            {value:'InProgress', name:'InProgress'},
            {value:'Completed', name:'Completed'}
        ]
		if(this.props.store.projectName == '') {
        	return null
		}

        console.log('Rerender Inputs');
    	return (
	        <div>
	        	<TextInput
						defaultValue={this.props.store.projectName}
                    className = {styles["text-input"]}
		        	label='Project name *' 
		        	placeholder='My first project'
		        	onChange={this.onProjectNameChange}
	        	/>
	        	<TextInput
					defaultValue=''
                    className = {styles["text-input"]}
	        		label='Link to project *' 
	        		placeholder='Link to project'
	        		onChange={this.onProjectLinkChange}
	        	/>
	        	<DateInput 
                    className = {styles["text-input"]}
	        		label='Start date *' 
	        		value={this.formatDate(new Date(this.props.store.timeBegin))}
	        		onChange={this.onStartDateChange}
	        	/>
	        	<DateInput 
                    className = {styles["text-input"]}
	        		label='Finish date *' 
	        		value={this.formatDate(new Date(this.props.store.timeEnd))}
	        		onChange={this.onFinishDateChange}
	        	/>
	        	<DropDown
					selectValue={this.props.store.condition}
                    className = {styles["text-input"]}
	        		label='Condition *'
	        		data = {conditionOpts}
	        		onChange={this.onConditionChange}
	        	/>
	        	<span>Description*</span>
                <Editor
                    className={styles["editor"]}
                    handleChange={this.onDescriptionChange}
                    initialContent={this.props.store.description.descrFullText}
                />
	        </div>
	    );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        store: state.EditProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);