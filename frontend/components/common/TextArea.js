import React, { PropTypes } from 'react';

const TextArea = ({id, label, value, placeholder, onChange, rows, cols}) => {
	const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
    return (
        <div>
         	{labelHtml}
         	<textarea 
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
	cols: 15
};

export default TextArea;