import React, { Component, PropTypes } from 'react';

const FileUpload = ({id, onChange}) => {
    return (
        <div>
            <input id={id} type="file" onChange={onChange}/>
        </div>
    );
}

FileUpload.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func
};

export default FileUpload;