import React, { PropTypes } from 'react';
import styles from './styles/textInput.sass';

const TextInput = ({id, label, value, placeholder, onChange,name}) => {
	const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
    return (
        <div>
         	{labelHtml}
        	<input 
                className={styles.myinput} 
                id={id} 
                type="text" 
                value={value} 
                placeholder={placeholder}
                onChange={onChange}
                name={name}
            />
        </div>
    );
};

TextInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string
};

export default TextInput;