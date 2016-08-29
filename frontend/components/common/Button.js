import React, { Component, PropTypes } from 'react';
import styles from './styles/button.sass';


class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {id, value, onClick, className} = this.props;
        return (
            <button    
                className={className}             
                id={id} 
                type="button" 
                onClick={onClick}>
            {value || this.props.children}
            </button>
        );
    }
}

Button.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;
