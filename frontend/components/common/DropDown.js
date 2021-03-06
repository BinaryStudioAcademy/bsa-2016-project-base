import React, { PropTypes } from 'react';
// import styles from './styles/dropdown.sass'

const DropDown = ({id, label, data, onChange, className, selectValue}) => {
	const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
	const options = data.map( option => {
	    if (selectValue == option.name) {
            return (
                <option
                    value={option.value}
                    key={'option_'+option.value} selected>
                    {option.name}
                </option>
            );
        } else {
            return (
                <option
                    value={option.value}
                    key={'option_'+option.value}>
                    {option.name}
                </option>
            );
        }

	});

    return (
        <div className={className}>
         	{labelHtml}
        	<select id={id} onChange={onChange}>
            <option
                value={''}
                key={'option_none'}>
            {'Select value'}
            </option>
			 	{options}
			</select>
        </div>
    );
};

DropDown.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func
};

export default DropDown;
