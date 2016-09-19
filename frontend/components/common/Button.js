import React, { Component, PropTypes } from 'react';
import styles from './styles/button.sass';


class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {id, value, disabled, onClick, className} = this.props;
        return (
            <button    
                className={className}             
                id={id} 
                type="button"
                disabled={disabled} 
                onClick={onClick}>
            {value || this.props.children}
            </button>
        );
    }
}

Button.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button;
