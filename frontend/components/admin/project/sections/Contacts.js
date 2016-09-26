import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, Checkbox, TextArea, DropDownNewProject, DateInput, TextInput, Editor, TextFieldProject, DatePickerControlled} from '../../../common/';
import styles from './styles/contacts.sass';
import FaAngleDown from 'react-icons/lib/fa/angle-down';


const maxChars = {
    countryCode: 10,
    countryName: 50,
    postalIndex: 50,
    state_region: 50,
    city: 50,
    street: 50,
    building: 10,
    appartment: 10,
    contactPerson: 50,
    phone: 50,
    email: 50,
    skype: 50
};

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.setContactFieldData = this.setContactFieldData.bind(this);
    }
   
    setContactFieldData(e, field){
    	const data = e.target.value;
        if (data.length <= maxChars[field]) {
            this.props.setContactFieldData(field, data);
        }
    }
    
    render() {
    	return (
	        <div id={styles['contacts']}>
                  <div className={styles.row}>
                    <div className={styles['field-container']}>
                        <TextFieldProject
                            value={this.props.contacts.countryName}
                            hintText='Enter the сountry name'
                            floatingLabelText='Country name'
                            onChange={(e) => {this.setContactFieldData(e, 'countryName')}}
                            style={{width: '100%'}}
                        />
                    </div>
                    <div className={styles['field-container']}>
                        <TextFieldProject 
                            value={this.props.contacts.countryCode}
                            hintText='Enter the country code' 
                            floatingLabelText='Country code' 
                           onChange={(e) => {this.setContactFieldData(e, 'countryCode')}}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>

                 {/*<div className={styles.row}>
                    <div className={styles['field-container']}>
                        <TextFieldProject
                            value={this.props.contacts.postalIndex}
                            hintText='Enter the postal index'
                            floatingLabelText='Postal index'
                            onChange={(e) => {this.setContactFieldData(e, 'postalIndex')}}
                            style={{width: '100%'}}
                        />
                    </div>
                    <div className={styles['field-container']}>
                        <TextFieldProject 
                            value={this.props.contacts.state_region}
                            hintText='Enter the state/province/region'
                            floatingLabelText='State/Province/Region'
                           onChange={(e) => {this.setContactFieldData(e, 'state_region')}}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>*/}

                 <div className={styles.row}>
                    <div className={styles['field-container']}>
                        <TextFieldProject
                            value={this.props.contacts.city}
                            floatingLabelText='City'
                            hintText='Enter the city' 
                            onChange={(e) => {this.setContactFieldData(e, 'city')}}
                            style={{width: '100%'}}
                        />
                    </div>
                    <div className={styles['field-container']}>
                        <TextFieldProject
                            value={this.props.contacts.contactPerson}
                            hintText='Enter the contact person'
                            floatingLabelText='Contact person'
                            onChange={(e) => {this.setContactFieldData(e, 'contactPerson')}}
                            style={{width: '100%'}}
                        />
                    </div>
                    {/*<div className={styles['field-container']}>
                        <TextFieldProject 
                            value={this.props.contacts.street}
                            hintText='Enter the street'
                            floatingLabelText='Street'
                           onChange={(e) => {this.setContactFieldData(e, 'street')}}
                            style={{width: '100%'}}
                        />
                    </div>*/}
                </div>

                {/* <div className={styles.row}>
                    <div className={styles['field-container']}>
                        <TextFieldProject
                            value={this.props.contacts.building}
                            hintText='Enter the building'
                            floatingLabelText='Building'
                            onChange={(e) => {this.setContactFieldData(e, 'building')}}
                            style={{width: '100%'}}
                        />
                    </div>
                    <div className={styles['field-container']}>
                        <TextFieldProject 
                            value={this.props.contacts.appartment}
                            hintText='Enter the appartment' 
                            floatingLabelText='Appartment'
                           onChange={(e) => {this.setContactFieldData(e, 'appartment')}}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>*/}

                <div className={styles.row}>                    
                    <div className={styles['field-container']}>
                        <TextFieldProject 
                            value={this.props.contacts.phone}
                            hintText='Enter the phone number'
                            floatingLabelText='Phone'
                           onChange={(e) => {this.setContactFieldData(e, 'phone')}}
                            style={{width: '100%'}}
                        />
                    </div>

                    <div className={styles['field-container']}>
                        <TextFieldProject
                            value={this.props.contacts.email}
                            hintText='Enter the e-mail'
                            floatingLabelText='E-mail'
                            onChange={(e) => {this.setContactFieldData(e, 'email')}}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>

                 <div className={styles.row}>                    
                    <div className={styles['field-container']}>
                        <TextFieldProject 
                            value={this.props.contacts.skype}
                            hintText='Enter the skype'
                            floatingLabelText='Skype'
                            onChange={(e) => {this.setContactFieldData(e, 'skype')}}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
	        </div>
	    );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        contacts: state.UpsertProjectReducer.contacts
    };
};

  
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);