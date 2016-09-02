import React, { Component, PropTypes } from 'react';
import { Subheader, Divider, TextField } from 'material-ui';

export default class ProjectsList extends Component {
    
    render() {
        const {project} = this.props;
        const sectionsName = Object.keys(project);
        const st = {display: 'flex', 'flexDirection': 'row', 'alignContent': 'center', 'alignItems': 'center', 'justifyContent': 'space-between'};
        const nameStyleWrap = {fontSize: '16px', lineHeight: '24px', width: '256px', height: '48px', display: 'inline-block', position: 'relative', fontFamily: 'Roboto, sans-serif'};
        const nameStyle = {position: 'absolute', opacity: 1, color: 'rgba(0, 0, 0, 0.541176)', bottom: '12px'};

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
                                        <div style={st} key={key} className='review-feature' data-name={feature.featureName}>
                                            <div style={nameStyleWrap}>
                                                <div style={nameStyle}>{feature.featureName}</div>
                                            </div>
                                            <TextField hintText="Day" style={{width: 'initial', whiteSpace: 'nowrap'}} data-name={'library'} floatingLabelText="With library"/>
                                            <TextField hintText="Day" style={{width: 'initial', whiteSpace: 'nowrap'}} data-name={'custom'} floatingLabelText="Custom solution"/>
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