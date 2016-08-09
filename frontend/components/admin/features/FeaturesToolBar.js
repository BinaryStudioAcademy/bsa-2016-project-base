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
        /*for(var i in items) sectionItems.push(
         <div key={items[i].id}>
         <FormControl type="checkbox" className={styles['select-checkbox']}
         id={items[i].id}  onChange={(e)=>{
         alert(e.target.attr('id'));
         }}/>
         <label htmlFor={items[i].id} className={styles['select-label']}>{items[i].name}</label>
         </div>
         );
         */
        var self = this;
        return (
            <Grid>
                <Row className={styles['features-tool-bar']}>
                    <Col xs={12} sm={6} md={4} lg={4}>
                        <div className={styles['search-input-container']}>
                            <FormControl className={styles['search-input']}
                                         type="text" placeholder="Search" onChange={this.handlerFilterFeatures}
                            />
                            <span className={styles['search-input-border']}></span>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}>
                        <MultiSelect title="Click for selecting sections ... ">
                            {
                                //   <option key={index} value={el._id} >{el.name}</option>
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
                    <Col xs={12} sm={12} md={4} lg={4}>
                        <FormControl type="checkbox" className={styles['select-all-checkbox']}
                                     id="markAll"  onChange={this.markAllFeature}
                                     checked={this.props.featuresData.features.length == this.props.featuresData.listCheckedFeatures.length
                                     && this.props.featuresData.features.length != 0}
                        />
                        <label htmlFor="markAll" className={styles['select-all-label']}>Mark all</label>
                        <Button className={styles['button-feature-remove']} onClick={this.removeChecked}>Remove marked</Button>
                        <Button className={styles['button-feature-add']}>Add feature</Button>
                    </Col>
                </Row>
            </Grid>
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
