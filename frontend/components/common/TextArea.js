import React, { PropTypes } from 'react';
import styles from './styles/textarea.sass';

const TextArea = ({id, label, value, placeholder, onChange, rows, cols}) => {
	const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
    return (
        <div>
         	{labelHtml}
         	<textarea 
                className={styles.mytextarea}
                id={id}
                rows={rows} 
                cols={cols}
                onChange={onChange}
                placeholder={placeholder}>
         		{value}
			</textarea>
        </div>
    );
};

TextArea.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    cols: PropTypes.number
};

TextArea.defaultProps = {
	rows: 5,
	cols: 30
};

export default TextArea;