import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import MultiSelect from './MultiSelect';
import { FormControl, Col, Button} from 'react-bootstrap';
import * as actionsSection from "../../../actions/admin/SectionsActions";
import * as actionsFeature from "../../../actions/admin/FeaturesActions";
import DD from '../../common/ddFilter';
import styles from './styles/Features.sass';

class FeaturesToolBar extends Component {
    constructor(props) {
        super(props);
        this.handlerRemoveChecked = this.handlerRemoveChecked.bind(this);
        this.handlerMarkAllFeature = this.handlerMarkAllFeature.bind(this);
        this.handlerFilterFeatures = this.handlerFilterFeatures.bind(this);
        this.handlerCheckedSectionSearch = this.handlerCheckedSectionSearch.bind(this);
        this.handlerChangeVisibilityForm = this.handlerChangeVisibilityForm.bind(this);
        this.props.getAllSections();
    }

    handlerChangeVisibilityForm() {
        this.props.changeVisibilityForm(this.props.featuresData.visibilityForm);

    }

    handlerRemoveChecked() {
        this.props.removeFeature(this.props.listCheckedFeatures);
        this.props.removeChecked();
        this.props.getAllFeaturesOfAllProjects();
    }

    componentWillMount () {
        this.props.getAllFeaturesOfAllProjects();
    }

    handlerMarkAllFeature(e) {
        this.props.markedAllFeatures(this.props.featuresData.features, e.target.checked);
    }

    handlerFilterFeatures(e) {
        this.props.filterFeatures(e.target.value);
    }

    handlerCheckedSectionSearch(e) {
        this.props.changeCheckedFeature(this.props.featuresData.listCheckedSections, e.target.checked, e.target.id)
    }

    render() {
        var self = this;
        return (
            <div>
                <div className={styles['features-tool-bar']}>
                    <div className={styles['search-input-container']}>
                        <input className={styles['search-input']}
                               type="text" 
                               placeholder="Search" 
                               onChange={this.handlerFilterFeatures}
                               id="FeatureSearchInput"
                        />
                        <span className={styles['search-input-border']}></span>
                    </div>
                        <MultiSelect title="Sections" id="multiSelectSections">
                            {
                                this.props.sectionsData.sections.map(function(el, index) {
                                    return (
                                        <div key={index}>
                                        <FormControl type="checkbox" className={styles['select-checkbox']}
                                    id={el._id}  onChange={self.handlerCheckedSectionSearch}/>
                                    <label htmlFor={el._id} className={styles['select-label']}>{el.name}</label>
                                    </div>
                                    )
                                })
                            }
                        </MultiSelect>
                        <MultiSelect title="Sections" id="multiSelectSections">
                            {
                                this.props.sectionsData.sections.map(function(el, index) {
                                    return (
                                        <div key={index}>
                                        <FormControl type="checkbox" className={styles['select-checkbox']}
                                    id={el._id}  onChange={self.handlerCheckedSectionSearch}/>
                                    <label htmlFor={el._id} className={styles['select-label']}>{el.name}</label>
                                    </div>
                                    )
                                })
                            }
                        </MultiSelect>
                        <FormControl type="checkbox" className={styles['select-all-checkbox']}
                                     id="markAll"  onChange={this.handlerMarkAllFeature}
                                     checked={this.props.featuresData.features.length == this.props.listCheckedFeatures.length &&
                                     this.props.featuresData.features.length != 0}
                        />
                        <label htmlFor="markAll" className={styles['select-all-label']}>Mark all</label>
                        <Button className={styles['button-feature-remove']} onClick={this.handlerRemoveChecked} id="buttonFeatureRemove">Remove marked</Button>
                        <Button className={styles['button-feature-add']} id="buttonFeatureAdd" onClick={this.handlerChangeVisibilityForm}>{
                            this.props.featuresData.visibilityForm === "hidden" ? "Add" : "Hide form"}</Button>
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