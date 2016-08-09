import React, { Component, PropTypes } from 'react';
import {Grid}  from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FeaturesListItem from './FeaturesListItem';
import styles from './styles/Features.sass';
import * as actionsSection from "../../../actions/SectionsActions";
import * as actionsFeature from '../../../actions/FeaturesActions'

class FeaturesList extends  Component {
    constructor(props) {
        super(props);
        this.checkSearchValue = this.checkSearchValue.bind(this);
    }


    checkSearchValue(filter, nameFeature) {
        if(filter.replace(/\s/g, '') == '') {
            return true;
        }
        return nameFeature.toLowerCase().indexOf(filter.toLowerCase()) == 0;
    }

    render() {
        //let featuresItems = new Array();
        const {features,filter} = this.props.featuresData;
            var self = this;

        return (
            <Grid className={styles['list-container']}>
            { features.map(function(feature, index) {
                //var flag = true;
                //if (filter && features[i].featureName.toLowerCase().indexOf(filter) == -1)  flag = false;
                //if (flag) featuresItems.push(<FeaturesListItem key={features[i].id} data-id={features[i].id}/>);
                if(self.checkSearchValue(filter, feature.featureName)) {

                    return (
                        <FeaturesListItem feature={feature} key={feature._id} data-id={feature._id}/>
                    )
                }
            })}
            </Grid>
    );

        //for(var i in features ) {

        //}
        //return (<Grid className={styles['list-container']}>{featuresItems}</Grid>);
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