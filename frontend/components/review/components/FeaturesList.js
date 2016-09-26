import React, { Component, PropTypes } from 'react';
import { Subheader, Divider, TextField } from 'material-ui';

import styles from "../review.sass"

export default class ProjectsList extends Component {
    
    render() {
        const {project} = this.props;
        const sectionsName = Object.keys(project);

        return (
            <form id="formSection">
                <Subheader>Select features, and type estimation time into input fields.</Subheader>
                <div>
                    {sectionsName.map((name, key) => {
                        return (
                            <div key={key} className='review-section' data-name={name}>
                                <h4 style={{textAlign: 'center'}}>{name}</h4>
                                <Divider />
                                {this.props.project[name].map((feature, key)=>{
                                    return (
                                        <div className={styles["review-feature"]} key={key} data-name={feature.featureName}>
                                            <div className={styles["nameStyleWrap"]}>
                                                <div className={styles["nameStyle"]}>{feature.featureName}</div>
                                            </div>
                                            <TextField hintText="Days" style={{width: 'initial', whiteSpace: 'nowrap'}} data-name={'library'} floatingLabelText="With library"/>
                                            <TextField hintText="Days" style={{width: 'initial', whiteSpace: 'nowrap'}} data-name={'custom'} floatingLabelText="Custom solution"/>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </form>
        );
    }
}