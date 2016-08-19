import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';


class CheckboxExampleSimple extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {id, label, defaultChecked, checked, disabled, onChange, style, iconStyle} = this.props;
        //const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
        return (
            <div>
							<Checkbox 
		            label={label}
		            defaultChecked={defaultChecked} 
		            checked={checked ? 'checked' : ''}
		            disabled={disabled}
		            onChange={onChange}
		            iconStyle={iconStyle}
		           />
            </div>
        );
    }
}


// CheckboxExampleSimple.defaultProps = {
//     checked: false
// };

export default CheckboxExampleSimple;