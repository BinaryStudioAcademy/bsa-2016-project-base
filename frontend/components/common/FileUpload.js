import React, { Component, PropTypes } from 'react';

const FileUpload = ({id, value, onChange}) => {
    return (
        <div>
            <input id={id} type="file" onChange={onChange}/>
        </div>
    );
}

FileUpload.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default FileUpload;