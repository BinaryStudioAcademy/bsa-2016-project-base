import React, { PropTypes } from 'react';

const TextArea = ({id, label, value, placeholder, onChange, rows, cols}) => {
	 const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
	return (
		<div>
			<li>
				{labelHtml}
				<textarea 
					id={id}
					name={id}
					className="text-area"
					onChange={onChange}
					placeholder={placeholder}>
					{value}
				</textarea>
			</li>
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

export default TextArea;