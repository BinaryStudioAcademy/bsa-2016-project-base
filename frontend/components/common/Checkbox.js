import React, { Component, PropTypes } from 'react';
import styles from './styles/checkbox.sass';

//<Checkbox label="Completed?" checked before/>


class Checkbox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { id, label, checked, before, placeholder, onChange} = this.props;
        const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
        const after = !before;
        return (
            <span>
                {before && labelHtml}
                <input 
                    type="checkbox" 
                    id={id} 
                    defaultChecked={checked} 
                    placeholder={placeholder} 
                    value="Car"
                    onChange={onChange}
                />
                {after && labelHtml}
            </span>
        );
    }
}

Checkbox.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool,
    placeholder: PropTypes.string,
    before: PropTypes.bool,
    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    checked: false,
    before: false
};

export default Checkbox;
