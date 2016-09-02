import React, { Component, PropTypes } from 'react';

const FileUpload = ({id, accept, multiple, onChange, error, className}) => {
    return (
        <div className={className}>
            <input id={id} type="file" accept={accept} onChange={onChange} multiple={multiple}/>
            <span>{error}</span>
        </div>
    );
}

FileUpload.propTypes = {
    id: PropTypes.string,
	accept: PropTypes.string,
	multiple: PropTypes.bool,
    onChange: PropTypes.func,
    error: PropTypes.string
};

FileUpload.defaultProps = {
	multiple: true
};

export default FileUpload;