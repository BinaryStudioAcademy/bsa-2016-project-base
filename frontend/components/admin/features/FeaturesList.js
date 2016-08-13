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
        this.checkSearchInNames = this.checkSearchInNames.bind(this);
        this.checkSelectedSections = this.checkSelectedSections.bind(this);
        this.checkSearchInDescriptions = this.checkSearchInDescriptions.bind(this);
        this.checkValue = this.checkValue.bind(this);
    }

    checkSearchInNames(nameFeature, nameSection, filter) {
        filter = filter.replace(/\s/g, '');
        if(filter == '') {
            return true;
        }
        if(nameFeature.toLowerCase().indexOf(filter.toLowerCase()) == 0 ||
            nameSection.toLowerCase().indexOf(filter.toLowerCase()) == 0) {
            return true
        }
    }

    checkSelectedSections(listCheckedSections, section) {
        if(listCheckedSections.length == 0 || listCheckedSections.indexOf(section) != -1) {
            return true;
        }
    }

    checkSearchInDescriptions(descriptionFeature, descriptionSection, filter) {
        filter = filter.replace(/\s/g, '');
        if(filter == '') {
            return true;
        }
        if(descriptionFeature.toLowerCase().indexOf(" " + filter.toLowerCase()) != -1 ||
            descriptionSection.toLowerCase().indexOf(" " + filter.toLowerCase()) != -1) {
            return true
        }
    }

    checkValue(nameFeature, nameSection, descriptionFeature, descriptionSection, listCheckedSections, section, filter) {
        if(this.checkSelectedSections(listCheckedSections, section) &&
            (this.checkSearchInNames(nameFeature, nameSection, filter) ||
            this.checkSearchInDescriptions(descriptionFeature, descriptionSection, filter))) {
            return true
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

                        if(self.checkValue(feature.featureName, feature.section.name,
                                feature.featureDescription.lists.join(''), feature.section.description,
                                self.props.featuresData.listCheckedSections, feature.section._id, filter)) {
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