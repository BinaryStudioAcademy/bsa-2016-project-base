

import React, { Component, PropTypes } from 'react';
import { Button, RaisedButtonUITags } from '../../common/';
import styles from './File.sass';
import * as constants  from '../../../constants/Api';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const {ORIGIN} = constants;

class File extends Component {
    constructor(props) {
        super(props);
    }

    CopyToClip(u_id){
       u_id.select();
       document.execCommand("Copy");
    }
    getRemoveButton(){
        return null;
    }
    renderStatus(){

         const {path, thumb, name, ready, good}  = this.props.file;
         const {onClick} = this.props;
         if (ready && good) {
            return (
                <div className={styles['attachment-content']}>
                    {this.getRemoveButton()}
                    <div className={styles['atachment-icon-ext']}>
                        <img src={thumb} alt={name} />
                        <span className={styles["name"]}>{name}</span>  
                    </div>
                    <div className={styles['atachment-options']}>
                        <a href={path} target="_blank">
                            View
                        </a>
                        <button
                            className={styles["btnCopy"]}
                            label='Copy url'
                            onClick={()=>{this.CopyToClip(this.refs.inputcopy);}}                      
                        >Copy Url</button>
                        <input className={styles["copyInput"]} type="text"
                            ref='inputcopy'
                            defaultValue={path}
                        />
                    </div>
                                            
                </div>
            );
        } else if (ready && !good) {
            const {error} = this.props.file;
            return (
                <div>
                    <Button className={styles["btnIcon"]} onClick={onClick && ((e) => onClick(e,name))}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                    </Button>
                    <span className={styles["error"]}>Error: </span>
                    <span className={styles["error-message"]}>{error}</span>
                </div>
            );
        }
        else {
            return (
                <div>
                    <a href={path} target="_blank">
                        <div className={styles["loader"]}></div>
                    </a>
                    <span className={styles["name"]}>{name}</span>
                </div>
            );
         }
    }
    render() {
        const {id} = this.props;
        return (
            <li className={styles["file-holder"]}>
               {this.renderStatus()}
            </li>
        );
    }
}

File.propTypes = {
    id: PropTypes.string
};

export default File;