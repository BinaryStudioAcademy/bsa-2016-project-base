import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/EditProjectActions';
import { Button, Checkbox, TextArea, DropDownEditProject, DropDownNewProject, DateInput, TextInput, Editor, TextFieldProject, DatePickerControlled} from '../../../common/';
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
		//alert(this.props.store.projectName);
		this.state = {
			selectedIndex: ''
		}
        
    }
	onProjectNameChange(e, id){
		//console.log('onProjectNameChange: ',e.target.value, id);
		const name = e.target.value;
		this.props.changeProjectName(name);
	}
	onProjectLinkChange(e, id){
		//console.log('onProjectLinkChange: ',e.target.value, id);
		const link = e.target.value;
		this.props.changeProjectLink(link);
	}
	onStartDateChange(e, d){
		console.log('onStartDateChange: ', d);
		const date = d;
		this.props.changeStartDate(date);
	}
	onFinishDateChange(e, d){
		console.log('onFinishDateChange: ', d);
		const date = d;
		this.props.changeFinishDate(date);
	}
	onConditionChange(e,option){
		console.log('onConditionChange: ',option);
		//const option = e.target.value;
		this.props.changeCondition(option);
	}
	onDescriptionChange(html){
		console.log('onDescriptionChange: ',html);
		const {setEditorRerender} = this.props;
		this.props.changeDescription(html);
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
    	//alert(this.props.load);
		//alert(this.state.selectedIndex);
        let conditionOpts = [
            {value:'Estimation', name:'Estimation'},
            {value:'InProgress', name:'InProgress'},
            {value:'Completed', name:'Completed'}
        ];

		if(this.props.projectName == '' || this.props.load == false) {
        	return null
		}
		else if(this.state.selectedIndex === '') {
			var self = this;
			conditionOpts.forEach(function(el, index) {
				if(el.name == self.props.status.name) {
					self.state.selectedIndex = index;
				}


			})
		}


        console.log('Rerender Inputs');
    	return (
			<div id={styles['basic-information']}>
				<header>
					<h2>Basic information</h2>
				</header>
				<div className={styles.row}>
					<div className={styles['field-container']}>
						<TextFieldProject
							value={this.props.projectName}
							hintText='Project name'
							placeholder='My first project'
							onChange={this.onProjectNameChange}
							style={{width: '100%'}}
						/>
					</div>
					<div className={styles['field-container']}>
						<TextFieldProject
							value={this.props.projectLink}
							hintText='Link to project'
							placeholder='Link to project'
							onChange={this.onProjectLinkChange}
							style={{width: '100%'}}
						/>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles['col-1-3']}>
						<DatePickerControlled
							value={new Date(this.props.timeBegin)}
							hint='Start Date'
							style={{width: '100%' ,
								cursor: 'pointer'}}
							onChange={this.onStartDateChange}
						/>
					</div>
					<div className={styles['col-1-3']}>
						<DatePickerControlled
							value={new Date(this.props.timeEnd)}
							hint='End Date'
							style={{width: '100%'}}
							onChange={this.onFinishDateChange}
						/>
					</div>
					<div className={styles['col-1-3']}>

						<DropDownEditProject
							value={this.props.status}
							selectedIndex={this.state.selectedIndex}
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
						initialContent={this.props.description.descrFullText}
						className='editor'
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
		projectName: state.EditProjectReducer.projectName,
		projectLink: state.EditProjectReducer.projectLink,
		timeBegin: state.EditProjectReducer.timeBegin,
		timeEnd: state.EditProjectReducer.timeEnd,
		status: state.EditProjectReducer.status,
		description: state.EditProjectReducer.description
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);