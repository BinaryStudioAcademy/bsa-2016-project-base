import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../../actions/FeaturesDetailsActions";

import { ListGroup, ListGroupItem, FormControl } from 'react-bootstrap';


class DetailsFeatures extends Component {

    filterFeatures(e) {
        this.props.filterFeaturesDetails(e.target.value);
    }

    render() {
        const {filtered} = this.props;
        const {search} = this.props.data;
        console.log(filtered);

        return (
        <div>
            <h3>Features</h3>

            <FormControl
                type="text"
                placeholder="Type to filter..."
                onInput ={ ::this.filterFeatures }
                value={ search }
            />

            <ListGroup >
                {filtered.map(function (feature, key) {
                    const {childFeatures, featureName} = feature;

                    return (
                        <ListGroupItem key={key} id={key}>
                            {featureName}
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    const { features, search } = state.FeaturesDetailsReducer;
    const myReg = new RegExp('^' + search, "i");

    let filtered = (!search) ? features: features.filter((feature) => myReg.test(feature.featureName));

    return {
        data: state.FeaturesDetailsReducer,
        filtered: filtered
    };
}

const DetailsFeaturesConnected = connect(mapStateToProps, mapDispatchToProps)(DetailsFeatures);
export default DetailsFeaturesConnected;