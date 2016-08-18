import React, { PropTypes } from 'react';

const TextInput = ({id, label, value, placeholder, onChange}) => {
	const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
	return (
		<div>
			<li>
				{labelHtml}
				<input 
					id={id}
					name={id}
					className="text-input"
					type="text" 
					defaultValue={value} 
					placeholder={placeholder}
					onChange={onChange}
				/>
			</li>
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