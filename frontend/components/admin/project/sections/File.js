import React, { Component, PropTypes } from 'react';
import { Button, RaisedButtonUITags } from '../../../common/';
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
                <Button className={styles.btnIcon} onClick={onClick && ((e) => onClick(e,name))}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                <a href={url} target="_blank">
                    <img src={thumb} alt={name} />
                </a>
                <div>
                    <span className={styles["name"]}>{name}</span>

                    <RaisedButtonUITags
                      className={styles.btnCopy}
                      label='Copy url'
                      onClick={()=>{this.CopyToClip(this.refs.inputcopy);}}
                      backgroundColor='#8d97a4'
                    />                 

                    {/*<Button                      
                      value="Copy url"
                      onClick={()=>{this.CopyToClip(this.refs.inputcopy);}}
                   />*/}
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
