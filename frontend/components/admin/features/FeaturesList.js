import React, { Component, PropTypes } from 'react';
import {Grid}  from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FeaturesListItem from './FeaturesListItem';
import styles from './styles/Features.sass';

class FeaturesList extends  Component {
    constructor(props) {
        super(props);
    }
    render() {
        let featuresItems = new Array();
        let {features,filter} = this.props.reduserState;
        for(var i in features ) {
            var flag = true;
            if (filter && features[i].featureName.toLowerCase().indexOf(filter) == -1)  flag = false;
            if (flag) featuresItems.push(<FeaturesListItem key={features[i].id} data-id={features[i].id}/>);
        }
        return (<Grid className={styles['list-container']}>{featuresItems}</Grid>);
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return {
        reduserState: state['FeaturesReducer']
    };
}
const FeaturesListModifated = connect(mapStateToProps, mapDispatchToProps)(FeaturesList);
export default FeaturesListModifated;