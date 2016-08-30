import React, { Component, PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/File.sass';



class File extends Component {
    constructor(props) {
        super(props);
    }

    CopyToClip(u_id){
       u_id.select();
       document.execCommand("Copy");
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

                    <Button
                   value="Copy url"
                   onClick={()=>{this.CopyToClip(this.refs.inputcopy);}}
                   />
                   <input className={styles["copyInput"]} type="text"
                   ref='inputcopy'
                   value={url}
                   />

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
