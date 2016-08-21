import React, { Component, PropTypes } from 'react';
import Button from './Button.js';
import TextInput from './TextInput.js';
import TextArea from './TextArea.js';

import styles from './styles/button.sass';

import injectTapEventPlugin from 'react-tap-event-plugin';
// import CheckboxExampleSimple from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import CheckboxExampleSimple from './CheckBoxUI.js';

import RadioButtonExampleSimple from './RadioButton.js';
import TextFieldSample from './TextFieldUI.js';

//import areIntlLocalesSupported from 'intl-locales-supported';

import DatePickerExampleControlled from './DatePickerUI.js'

import {bsagrey, bsagreen} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


injectTapEventPlugin();


const muiTheme = getMuiTheme({
  palette: {
  	primary1Color: bsagrey,
		textColor: bsagrey,
		primary2Color: bsagrey
		// alternateTextColor,
		// alternateTextColor
    //calendarYearBackgroundColor: _colors.white

  }
});

class Test extends Component {
	constructor(props) {
        super(props);
    }

    render() {
    	return(
	    	<div className={styles.test}>
	    		<Button
	    			value='Click'
	    			onClick={function(){alert('222')}}
	    		/>
	    		<br/><br/>
	    		<TextInput
	    			label='label for input'
	    			placeholder='type anything'
	    		/>
	    		<br/>
	    		TextInput material-ui
	    		<MuiThemeProvider>
				  	<TextFieldSample
							hintText='type anything'
				  	/>
				  </MuiThemeProvider>

	    		<br/><br/>
	    		<TextArea
	    			label='label for textarea'
	    			placeholder='type anything'
	    		/>
	    		<br/><br/>

	    		<MuiThemeProvider muiTheme={muiTheme}>
	    			<DatePicker
	    				hintText="New Date"
	    				/>
	    		</MuiThemeProvider>

	    		<br/>

	    		<MuiThemeProvider muiTheme={muiTheme}>
						<CheckboxExampleSimple
							label="label for checkboxUI"
							checked='checked'
							iconStyle={{
						     fill: bsagreen
						   }}
						/>
					</MuiThemeProvider>

					<MuiThemeProvider muiTheme={muiTheme}>
						<CheckboxExampleSimple
							label="label for checkboxUI"
							iconStyle={{
						     fill: bsagreen
						   }}
						/>
					</MuiThemeProvider>
					<br/>



					<MuiThemeProvider muiTheme={muiTheme}>
				  	<RadioButtonExampleSimple />
				  </MuiThemeProvider>


					 <MuiThemeProvider muiTheme={muiTheme}>
				   	<DatePickerExampleControlled />
				   </MuiThemeProvider>

	    	</div>
    	);
    }
}

export default Test;