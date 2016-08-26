import React, { Component, PropTypes } from 'react';
import ReactDom from "react-dom";
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import { RaisedButton, Subheader, Divider, FlatButton, TextField, CircularProgress } from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import wrapState from './wrapState';
import documentService from "../../../services/DocumentService";

let SelectableList = wrapState(MakeSelectable(List));

export default class ProjectList extends Component {
    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
        form: null,
        authLink: '',
        link: ''
    };

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        let form = null;

        if (stepIndex === 0) {
            this.setState({loading: true});
            this.props.getProject(this.props.selectedProject);
        }
        if (stepIndex === 1){
            form = this.getDataFromForm();
            documentService.getAuthLink().then(json=>{
                const link = json.link;
                this.setState({authLink: link, loading: true, form: form});
            })
        }
        if (stepIndex === 2) {
            this.doRequest();
        }
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            }));
        }
    };

    doRequest(){
        if (!this.state.tokens){
            this.onAuth();
        }
        else {
            this.receiveFileLink();
        }
    }

    onAuth(){
        var url = this.state.authLink;
        window.open(url, "", "width=600,height=600");
    }

    inputChangeHandler(){
        var allTokens = JSON.parse(ReactDom.findDOMNode(this.refs.tokens).value);
        this.setState({tokens:allTokens}, function(){
            this.receiveFileLink();
        }.bind(this));
    }

    receiveFileLink(){
        var {receiveFileLink} = this.props;
        var allTokens = this.state.tokens;
        var tokens = JSON.stringify({access_token:allTokens.access_token});
        var data = this.state.form;

        documentService.setDataToFile(data, tokens)
            .then(res=>res.json()).then(data=>{
            const link = data.link;
            this.setState({link, finished: true});
        })
    }

    getDataFromForm () {
        let data = [];
        const section = document.getElementById('formSection').getElementsByClassName('section');

        for(let i = 0, l = section.length; i < l; i++) {
            let feature = section[i].getElementsByClassName('feature');
            let sectionName = section[i].dataset.name;
            let features = [].map.call(feature, item => {
                let featureName = item.dataset.name;
                let input = item.getElementsByTagName('input');

                return {
                    featuresName: featureName,
                    library: input[0].value,
                    custom: input[1].value
                };
            });
            data.push({sectionName: sectionName, features: features});
        }
        return data;
    }

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1
            }));
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                const { projects, selectedProject, handleRequestChange } = this.props;

                if (!projects.length) return <Subheader>No fit projects</Subheader>;
                let listOfProjects = projects.map((project, key)=>{
                    return (
                        <ListItem
                        key={key}
                        value={project._id}
                        primaryText={project.projectName}
                        secondaryText={project.description.descrText}
                    />);
                });

                return (
                    <div>
                        <SelectableList selectedProject={selectedProject} handleRequestChange={handleRequestChange}>
                            <Subheader>Please, select Project for creating Estimation Table</Subheader>
                            <Divider />
                            {listOfProjects}
                            <Divider />
                        </SelectableList>
                    </div>
                );
            case 1:
                let sectionsName = Object.keys(this.props.project);
                const st = {display: 'flex', 'flexDirection': 'row', 'alignContent': 'center', 'alignItems': 'center', 'justifyContent': 'space-between'};
                const nameStyleWrap = {fontSize: '16px', lineHeight: '24px', width: '256px', height: '48px', display: 'inline-block', position: 'relative', fontFamily: 'Roboto, sans-serif'};
                const nameStyle = {position: 'absolute', opacity: 1, color: 'rgba(0, 0, 0, 0.541176)', bottom: '12px'};

                return (
                    <form id="formSection">
                        <Subheader>Select features, and type estimation time into input fields.</Subheader>
                        <list>
                            {sectionsName.map((name, key) => {
                            return (
                                <div key={key} className='section' data-name={name}>
                                    <h4 style={{textAlign: 'center'}}>{name}</h4>
                                    <Divider />
                                    {this.props.project[name].map((feature, key)=>{
                                        const prefix = name + '!-!' + feature.featureName + '!-!';
                                        return (
                                            <div style={st} key={key} className='feature' data-name={feature.featureName}>
                                                <div style={nameStyleWrap}>
                                                    <div style={nameStyle}>{feature.featureName}</div>
                                                </div>
                                                <TextField hintText="With library" style={{width: 'initial', whiteSpace: 'nowrap'}} data-name={'library'}/>
                                                <TextField hintText="Custom solution" style={{width: 'initial', whiteSpace: 'nowrap'}} data-name={'custom'}/>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                            })}
                        </list>
                    </form>
                );
            case 2:
                return (
                    <p>
                        Для генерации файла с эстимейтами нажмите "Generate"

                    </p>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent() {
        const {finished, stepIndex, link} = this.state;
        const {selectedProject} = this.props;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};
        const color = {color: 'rgb(0, 188, 212)'};

        if (finished) {
            return (
                <div style={contentStyle}>
                    <input type="hidden" id="tokens" ref="tokens"/>
                    <input type="hidden" id="auth-success" onClick={this.inputChangeHandler.bind(this)}/>

                    {(link)?
                        <div>
                            <p>
                                <a  target="_blank"
                                    href={link}
                                    style={color}
                                >
                                    Link to Estimation
                                </a>
                            </p>
                            <p>
                                <a
                                    href="#"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        this.setState({stepIndex: 0, finished: false});
                                    }}
                                    style={color}
                                >
                                    Click here
                                </a> to create a new estimation.
                            </p>
                        </div>: <div style={{textAlign: 'center'}}><CircularProgress /></div>}
                </div>
            );
        }

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={::this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label={stepIndex === 2 ? 'Generate' : 'Next'}
                        disabled={selectedProject === null}
                        primary={true}
                        onClick={::this.handleNext}
                    />
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;

        return (
            <div style={{width: '100%', maxWidth: 768, margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Select project</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Set etimations</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Generate document</StepLabel>
                    </Step>
                </Stepper>

                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>

            </div>
        );
    }
}