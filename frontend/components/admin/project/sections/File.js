import React, { Component, PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/File.sass';
import * as constants  from '../../../../constants/Api';
const {ORIGIN} = constants;

class File extends Component {
    constructor(props) {
        super(props);
    }

    CopyToClip(u_id){
       u_id.select();
       document.execCommand("Copy");
    }
    renderStatus(){

         const {path, thumb, name, ready, good}  = this.props.file;
         const {onClick} = this.props;
         if (ready && good) {
            return (
                <div>
                    <a href={path} target="_blank">
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
                            value={ORIGIN+path}
                        />
                    </div>
                </div>
            );
        } else if (ready && !good) {
            const {error} = this.props.file;
            return (
                <div>
                    <Button onClick={onClick && ((e) => onClick(e,name))}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </Button>
                    <span className={styles["error"]}>Error:</span>
                     {error}
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
    id: PropTypes.string
};

export default File;
