/*trash*/

import React, { Component, PropTypes } from 'react';
import CheckBox from './CheckBox-ui.js';
import TextFieldUI from './TextField-ui.js';
import RaisedButtonUI from './RaisedButton-ui.js';

import Button from './Button.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
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
						/>

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