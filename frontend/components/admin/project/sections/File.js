import React, { Component, PropTypes } from 'react';
import { Button, RaisedButtonUITags } from '../../../common/';
import styles from './styles/File.sass';
import * as constants  from '../../../../constants/Api';

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
        const {onClick, index} = this.props;
        const {path, thumb, name, ready, good}  = this.props.file;

        return <Button className={styles["btnIcon"]} onClick={onClick && ((e) => onClick(e,this.props.file, index))}>
            <i className="fa fa-times" aria-hidden="true"></i>
        </Button>
    }
    renderStatus(){

         const {path, thumb, name, ready, good}  = this.props.file;
         const {onClick, index} = this.props;
         if (ready && good) {
            return (
                <div className={styles["file-block"]}>
                    {this.getRemoveButton()}
                    <a href={path} target="_blank">
                        <img src={thumb} alt={name} />
                    </a>
                    <div>
                        <span className={styles["name"]}>{name}</span>                        
                        <MuiThemeProvider>
                        <RaisedButton
                            className={styles["btnCopy"]}
                            label='Copy url'
                            onClick={()=>{this.CopyToClip(this.refs.inputcopy);}}                      
                        />
                        </MuiThemeProvider>
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
                <div className={styles["file-block"]}>
                    <Button className={styles["btnIcon"]} onClick={onClick && ((e) => onClick(e,this.props.file,index))}>
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
            <div id={styles["file-holder"]}>
               {this.renderStatus()}
            </div>
        );
    }
}

File.propTypes = {
    id: PropTypes.string,
    index: PropTypes.number
};

export default File;
