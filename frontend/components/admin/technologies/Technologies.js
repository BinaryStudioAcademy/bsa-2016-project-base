import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from "../../../actions/admin/TechnologiesActions";
import  TechnologiesList from "./TechnologiesList";
import  TechnologiesSearch from "./TechnologiesSearch";
import  TechnologiesControl from "./TechnologiesControl";

class Technologies extends Component {
    constructor() {
        super();
     //   this.initTechnologies();

    }
    componentWillMount(){
        this.props.initTechnology();
    }

    render() {
        return (
            <div className="technologiesTab">
                <nav className="technologiesnav nav">
                    <TechnologiesSearch />
                    <TechnologiesControl />
                </nav>
                <TechnologiesList/>

            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}
const TechnologiesTab = connect(mapStateToProps, mapDispatchToProps)(Technologies);
export default TechnologiesTab;
