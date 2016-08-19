import React, { PropTypes } from 'react';
import styles from './styles/dateinput.sass';

const DateInput = ({id, label, value, onChange}) => {
    const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
    return (
        <div>
         	{labelHtml}
        	<input
                className={styles.mydateinput}
                id={id} 
                type="date" 
                defaultValue={value}
                onChange={onChange}
            />
        </div>
    );
};

DateInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string
};

export default DateInput;