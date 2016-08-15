import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import MultiSelect from './MultiSelect';
import {Grid, FormControl, Row, Col, Button} from 'react-bootstrap';
import * as actionsSection from "../../../actions/admin/SectionsActions";
import * as actionsFeature from "../../../actions/admin/FeaturesActions";

import styles from './styles/Features.sass';

class FeaturesToolBar extends Component {
    constructor(props) {
        super(props);
        this.removeChecked = this.removeChecked.bind(this);
        this.markAllFeature = this.markAllFeature.bind(this);
        this.handlerFilterFeatures = this.handlerFilterFeatures.bind(this);
        this.handlerCheckedSection = this.handlerCheckedSection.bind(this);
        this.handlerChangeVisibilityForm = this.handlerChangeVisibilityForm.bind(this);
    }

    handlerChangeVisibilityForm() {
        this.props.changeVisibilityForm(this.props.featuresData.visibilityForm)
    }

    removeChecked() {
        let {listCheckedFeatures} = this.props.featuresData;
        this.props.removeFeature(listCheckedFeatures);
        this.props.getAllFeaturesOfAllProjects();
    }

    componentWillMount () {
        this.props.getAllFeaturesOfAllProjects();
    }

    markAllFeature(e) {
        this.props.markedAllFeatures(this.props.featuresData.features, e.target.checked, this.props.featuresData.listCheckedFeatures);
    }

    handlerFilterFeatures(e) {
        this.props.filterFeatures(e.target.value);
    }

    handlerCheckedSection(e) {
        this.props.changeCheckedSections(this.props.featuresData.listCheckedSections, e.target.checked, e.target.id)
    }

    render() {
        var self = this;
        return (
            <div>
                <div className={styles['features-tool-bar']}>
                    <Col xs={12} sm={4} >
                        <div className={styles['search-input-container']}>
                            <FormControl className={styles['search-input']}
                                         type="text" placeholder="Search" onChange={this.handlerFilterFeatures}
                                         id="FeatureSearchInput"
                            />
                            <span className={styles['search-input-border']}></span>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <MultiSelect title="Sections" id="multiSelectSections">
                            {
                                this.props.sectionsData.sections.map(function(el, index) {
                                    return (
                                        <div key={index}>
                                        <FormControl type="checkbox" className={styles['select-checkbox']}
                                    id={el._id}  onChange={self.handlerCheckedSection}/>
                                    <label htmlFor={el._id} className={styles['select-label']}>{el.name}</label>
                                    </div>
                                    )
                                })
                            }
                        </MultiSelect>
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormControl type="checkbox" className={styles['select-all-checkbox']}
                                     id="markAll"  onChange={this.markAllFeature}
                                     checked={this.props.featuresData.features.length == this.props.featuresData.listCheckedFeatures.length
                                     && this.props.featuresData.features.length != 0}
                        />
                        <label htmlFor="markAll" className={styles['select-all-label']}>Mark all</label>
                        <Button className={styles['button-feature-remove']} onClick={this.removeChecked} id="buttonFeatureRemove">Remove marked</Button>
                        <Button className={styles['button-feature-add']} id="buttonFeatureAdd" onClick={this.handlerChangeVisibilityForm}>{
                            this.props.featuresData.visibilityForm === "hidden" ? "Add" : "Hide form"}</Button>
                    </Col>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...actionsSection,
        ...actionsFeature}, dispatch);
}

function mapStateToProps(state) {
    return {
        sectionsData: state.SectionsReducer,
        featuresData: state.FeaturesReducer,
    };
}

const  FeaturesToolBarConnected = connect(mapStateToProps, mapDispatchToProps)(FeaturesToolBar);
export default  FeaturesToolBarConnected;
