import React, { Component, PropTypes } from 'react';

const FileUpload = ({id, name, onChange}) => {
    return (
        <div>
            <input id={id} type="file" name={name} onChange={onChange}/>
        </div>
    );
}

FileUpload.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};

export default FileUpload;