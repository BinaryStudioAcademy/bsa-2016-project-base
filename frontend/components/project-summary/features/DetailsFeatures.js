import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchFeatures from './components/SearchFeatures';
import ListFeatures from './components/ListFeatures';
import DetailsFeature from './components/DetailsFeature';

import * as actions from "../../../actions/FeaturesDetailsActions";
import * as styles from "./DetailsFeatures.sass"

class DetailsFeatures extends Component {

    static propTypes = {
        projectId: React.PropTypes.string.isRequired
    };

    componentDidMount() {
        const {getAllFeatures, projectId} = this.props;
        getAllFeatures(projectId);
    }

    filterFeatures(e) {
        this.props.filterFeaturesDetails(e.target.value);
    }

    open(e) {
        const id = e.target.closest('button').dataset.id;
        this.props.openModal(id);
    }

    close() {
        this.props.closeModal();
    }

    render() {
        const {filtered, showModal} = this.props;
        const {search, showFeaturesDetailsId, features, subfeatures} = this.props.data;
        let featuresDetails = {};

        if (!!showFeaturesDetailsId) {
            featuresDetails = filtered.filter((obj) => obj._id === showFeaturesDetailsId)[0];
        }

        return (
            <div className={styles.wrap}>
                <h3 className="text-center">Features</h3>

                <SearchFeatures
                    filter = {::this.filterFeatures}
                    search = {search}/>

                <ListFeatures
                    modalOpen = {::this.open}
                    visibleFeatures = {filtered}
                    allFeatures= {features}/>

                <DetailsFeature
                    showModal = {showModal}
                    closeModal = {::this.close}
                    feature = { featuresDetails }
                    subfeatures= {subfeatures}/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    const { features, search, showFeaturesDetailsModal } = state.FeaturesDetailsReducer;
    const myReg = new RegExp('^' + search, "i");

    let filtered = (!search) ? features: features.filter((feature) => myReg.test(feature.featureName));

    return {
        data: state.FeaturesDetailsReducer,
        filtered: filtered,
        showModal: showFeaturesDetailsModal
    };
}

const DetailsFeaturesConnected = connect(mapStateToProps, mapDispatchToProps)(DetailsFeatures);
export default DetailsFeaturesConnected;