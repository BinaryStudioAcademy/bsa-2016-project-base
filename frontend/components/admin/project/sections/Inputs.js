import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, Checkbox, TextArea, DropDown, DateInput, TextInput, Editor } from '../../../common/';


class Inputs extends Component {
    constructor(props) {
        super(props);
        this.onProjectNameChange = this.onProjectNameChange.bind(this);
        this.onProjectLinkChange = this.onProjectLinkChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onFinishDateChange = this.onFinishDateChange.bind(this);
        this.onConditionChange = this.onConditionChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        
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
        return nextProps.conditions !== this.props.conditions;
    }
    render() {
        const {conditions} = this.props;

        const conditionOpts = conditions.map( item => {
            return {
                value: item._id,
                name: item.conditionName
            }
        });

        console.log('Rerender Inputs');
    	return (
	        <div>
	        	<TextInput
		        	label='Project name *' 
		        	placeholder='My first project'
		        	onChange={this.onProjectNameChange}
	        	/>
	        	<TextInput 
	        		label='Link to project *' 
	        		placeholder='Link to project'
	        		onChange={this.onProjectLinkChange}
	        	/>
	        	<DateInput 
	        		label='Start date *' 
	        		value={'2013-06-09'}
	        		onChange={this.onStartDateChange}
	        	/>
	        	<DateInput 
	        		label='Finish date *' 
	        		value={'2014-02-09'}
	        		onChange={this.onFinishDateChange}
	        	/>
	        	<DropDown
	        		label='Condition *' 
	        		data = {conditionOpts}
	        		onChange={this.onConditionChange}
	        	/>
	        	<span>Description*</span>
                <Editor 
                    handleChange={this.onDescriptionChange}
                    initialContent={'Enter project description'}
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
        conditions: state.UpsertProjectReducer.conditions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);