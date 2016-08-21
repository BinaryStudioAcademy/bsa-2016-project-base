/*trash*/

import React, { Component, PropTypes } from 'react';
import CheckBox from './CheckBox-ui.js';
import TextFieldUI from './TextField-ui.js';
import RaisedButtonUI from './RaisedButton-ui.js';

import Button from './Button.js';
import TextInput from './TextInput.js';
import TextArea from './TextArea.js';

import styles from './styles/button.sass';

import injectTapEventPlugin from 'react-tap-event-plugin';
// import CheckboxExampleSimple from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import CheckboxExampleSimple from './checkboxUI.js';

import RadioButtonExampleSimple from './RadioButton.js';
import TextFieldSample from './TextField.js';

//import areIntlLocalesSupported from 'intl-locales-supported';

import DatePickerExampleControlled from './DatePickerUI.js'

import {bsagrey, bsagreen} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


injectTapEventPlugin();


const styles = {
  divmar: {
    margin: '100px',
  }
};

class Test extends Component {
	constructor(props) {
        super(props);
    }

    render() {
    	return(
	    	<div style={styles.divmar}>
						<CheckBox
							label="label for checkboxUI"
							checked='checked'
							iconStyle={{
						     fill: bsagreen
						   }}
						/>
					</MuiThemeProvider>	

						<TextFieldUI
							hintText='type anything'
				  	/>

				  	<RaisedButtonUI 
				  		label='Label for button'
				  	/>

				  	<RaisedButtonUI 
	    			label='Click'
	    			style={{display: 'inline-block', margin: '20px'}}
	    		/>
				  
	    	</div>
    	);
    }
}

export default Test;