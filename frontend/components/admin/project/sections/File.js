import React, { Component, PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/File.sass';

class File extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {id, url, thumb, name, onClick} = this.props;
        return (
            <div id={styles["file-holder"]}>
                <a href={url} target="_blank">
                    <img src={thumb} alt={name} />
                </a>
                <div>
                    <span className={styles["name"]}>{name}</span>
                    <Button onClick={onClick && ((e) => onClick(e,name))}>
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </Button>
                </div>
                
            </div>
        );
    }
}

File.propTypes = {
    id: PropTypes.string,
    thumb: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string
};

export default File;