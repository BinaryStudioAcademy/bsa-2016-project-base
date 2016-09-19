import React, { PropTypes } from 'react';

const DataList = ({id, label, data, onChange}) => {
	const labelHtml = label ? <label htmlFor={id}>{label}</label> : '';
	const options = data.map( option => {
		return (
			<option 
                value={option.name}
                key={'option_'+option.value}>
            </option>
		);
	});

    return (
        <div>
         	{labelHtml}
            <input list={id} onChange={onChange}/>
            <datalist id={id} >
                {options}
            </datalist>
        </div>
    );
};

DataList.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func
};

export default DataList;

 