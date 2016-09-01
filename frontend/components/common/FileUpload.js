import React, { Component, PropTypes } from 'react';

const FileUpload = ({id, accept, onChange, className}) => {
    return (
        <div className={className}>
            <input id={id} type="file" accept={accept} onChange={onChange}/>
        </div>
    );
}

FileUpload.propTypes = {
    id: PropTypes.string,
	accept: PropTypes.string,
    onChange: PropTypes.func
};

export default FileUpload;