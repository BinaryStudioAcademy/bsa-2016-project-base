import React, { PropTypes } from 'react';

const DateInput = ({id, label, value, onChange}) => {
	const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
	return (
		<div>
			<li>
				{labelHtml}
				<input
					id={id} 
					name={id}
					className = "date-input"
					type="date" 
					defaultValue={value}
					onChange={onChange}
					/>
				</li>
		</div>
	);
};

DateInput.propTypes = {
	 id: PropTypes.string,
	 label: PropTypes.string.isRequired,
	 defaultValue: PropTypes.string
};

export default DateInput;