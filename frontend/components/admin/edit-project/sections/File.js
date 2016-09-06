import React, { Component, PropTypes } from 'react';
import { Button, RaisedButtonUITags } from '../../../common/';
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
                    <Button className={styles["btnIcon"]} onClick={onClick && ((e) => onClick(e,name))}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </Button>
                    <a href={path.indexOf("http") == 0 ? path : constants.ORIGIN + path} target="_blank">
                        <img src={thumb.indexOf("http") == 0 ? thumb : constants.ORIGIN + thumb} alt={name} />
                    </a>
                    <div>
                        <span className={styles["name"]}>{name}</span>

                        <RaisedButtonUITags
                            className={styles["btnCopy"]}
                            label='Copy url'
                            onClick={()=>{this.CopyToClip(this.refs.inputcopy);}}
                            backgroundColor= '#8d97a4'
                        />
                        <input className={styles["copyInput"]} type="text"
                               ref='inputcopy'
                               defaultValue={ORIGIN+path}
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