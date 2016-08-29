import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, Checkbox, TextArea, DropDownNewProject, DateInput, TextInput, Editor, TextFieldProject, DatePickerControlled} from '../../../common/';
import styles from './styles/inputs.sass';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

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
        const conditionOpts = [
            {value:'Estimation', name:'Estimation'},
            {value:'InProgress', name:'InProgress'},
            {value:'Completed', name:'Completed'}
        ]

        console.log('Rerender Inputs');
    	return (
	        <div id={styles['basic-information']}>
                <header>
                    <h2>Basic information</h2>
                </header>
                <div className={styles.row}>
                    <div className={styles['field-container']}>
	        	        <TextFieldProject
		        	        hintText='Project name' 
		        	        placeholder='My first project'
		        	        onChange={this.onProjectNameChange}
                            style={{width: '100%'}}
	        	        />
                    </div>
                    <div className={styles['field-container']}>
	        	        <TextFieldProject 
	        		        hintText='Link to project' 
	        	 	        placeholder='Link to project'
	        		        onChange={this.onProjectLinkChange}
                            style={{width: '100%', borderRadius: '5px'}}
	        	        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles['col-1-3']}>
                        <DatePickerControlled 
                            hint='Start Date'
                            style={{width: '100%'}}
                            onChange={this.onStartDateChange}
                        />
                    </div>
                    <div className={styles['col-1-3']}>
                        <DatePickerControlled
                            hint='End Date'
                            style={{width: '100%'}}
                            onChange={this.onFinishDateChange}
                        />
                    </div>
                    <div className={styles['col-1-3']}>
                        
                        <DropDownNewProject
                            label='Condition' 
                            data = {conditionOpts}
                            onChange={this.onConditionChange}
                            id='Condition'
                         />
                          <div className='angle-icon'>
                            <FaAngleDown />
                        </div>
                    </div>

                </div>
                <hr />
                <header>
                    <h2>Description</h2>
                </header>
                <div className={styles.row}>
                     <Editor 
                    handleChange={this.onDescriptionChange}
                    initialContent={'Enter project description'}
                    />
                </div>
                <hr />
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
