import React, { Component, PropTypes } from 'react';
import ReactDom from "react-dom";
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { RaisedButton, FlatButton, CircularProgress } from 'material-ui';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import ProjectsList from './ProjectsList';
import FeaturesList from './FeaturesList';
import documentService from "../../../services/DocumentService";
import {toastr} from 'react-redux-toastr';

import styles from "../review.sass"

export default class EstimationStepper extends Component {
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
            }).catch((err)=>toastr.warning('Error', `Handle rejected promise ${err} here.)`));
        }
        if (stepIndex === 2) {
            this.doRequest();
        }
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2
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
        this.setState({tokens:allTokens}, ()=>this.receiveFileLink());
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
        }).catch((err)=>toastr.warning('Error', `Handle rejected promise ${err} here.)`));
    }

    getDataFromForm () {
        let data = [];
        const section = document.getElementById('formSection').getElementsByClassName('review-section');

        for(let i = 0, l = section.length; i < l; i++) {
            let feature = section[i].getElementsByClassName('review-feature');
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

    handleReset = (event) => {
        event.preventDefault();
        this.setState({stepIndex: 0, finished: false}, this.props.handleRequestChange(null, null));
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                const { projects, selectedProject, handleRequestChange } = this.props;
                return (
                    <ProjectsList
                        projects={projects}
                        selectedProject={selectedProject}
                        handleRequestChange={handleRequestChange}
                    />
                );
            case 1:
                const {project} = this.props;
                return <FeaturesList project={project} />;
            case 2:
                return <p>For generation Estimation Table click Generate button</p>;
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent() {
        const {finished, stepIndex, link} = this.state;
        const {selectedProject} = this.props;

        if (finished) {
            return (
                <div className={styles["contentStyle"]}>
                    <input type="hidden" id="tokens" ref="tokens"/>
                    <input type="hidden" id="auth-success" onClick={::this.inputChangeHandler}/>

                    {(link)?
                        <div>
                            <p>
                                <a  target="_blank"
                                    href={link}
                                    className={styles["a"]}
                                >
                                    Link to Estimation
                                </a>
                            </p>
                            <p>
                                <a
                                    href="#"
                                    onClick={this.handleReset}
                                    className={styles["a"]}
                                >
                                    Click here
                                </a> to create a new estimation.
                            </p>
                        </div>: <div style={{textAlign: 'center'}}><CircularProgress /></div>}
                </div>
            );
        }

        return (
            <div className={styles["contentStyle"]}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div className={styles["btnContainer"]} >
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={::this.handlePrev}
                        
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
            <div className={styles["stepper"]}>
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