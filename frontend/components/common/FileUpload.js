import React, { Component, PropTypes } from 'react';

const FileUpload = ({id, accept, multiple, onChange}) => {
    return (
        <div>
            <input id={id} type="file" accept={accept} onChange={onChange} multiple={multiple}/>
        </div>
    );
}

FileUpload.propTypes = {
    id: PropTypes.string,
	accept: PropTypes.string,
	multiple: PropTypes.bool,
    onChange: PropTypes.func
};

FileUpload.defaultProps = {
	multiple: true
};

export default FileUpload;