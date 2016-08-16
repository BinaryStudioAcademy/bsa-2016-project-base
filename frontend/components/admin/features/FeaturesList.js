import React, { Component, PropTypes } from 'react';
import {Grid}  from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FeaturesListItem from './FeaturesListItem';
import styles from './styles/Features.sass';
import * as actionsSection from "../../../actions/admin/SectionsActions";
import * as actionsFeature from '../../../actions/admin/FeaturesActions'

class FeaturesList extends  Component {
    constructor(props) {
        super(props);
        this.checkSearchValue = this.checkSearchValue.bind(this);
        this.checkSelectedSections = this.checkSelectedSections.bind(this);
    }

    checkSearchValue(filter, nameFeature) {
        if(filter.replace(/\s/g, '') == '') {
            return true;
        }
        return nameFeature.toLowerCase().indexOf(filter.toLowerCase()) == 0;
    }

    checkSelectedSections(listCheckedSections, section) {
        if(listCheckedSections.length == 0 || listCheckedSections.indexOf(section) != -1) {
            return true;
        }
    }

    render() {
        const {features,filter} = this.props.featuresData;
        var self = this;

        return (
            <div className={styles['list-container']} id="'list-container">
            {

                features.map(function(feature) {
                var check = false;
                if(self.checkSearchValue(filter, feature.featureName)
                    && self.checkSelectedSections(self.props.featuresData.listCheckedSections, feature.section._id)) {
                    if(self.props.featuresData.listCheckedFeatures.indexOf(feature._id) != -1 || self.props.featuresData.allChecked) {
                        check = true;
                    }
                    else {
                        check = false;
                    }
                    return (
                        <FeaturesListItem check={check} feature={feature} key={feature._id}/>
                    )
                }
            })}
            </div>
    );
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
const FeaturesListConnected = connect(mapStateToProps, mapDispatchToProps)(FeaturesList);
export default FeaturesListConnected;