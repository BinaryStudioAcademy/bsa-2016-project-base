import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from "../../../actions/admin/TechnologiesActions";
import  TechnologiesList from "./TechnologiesList";
import  TechnologiesSearch from "./TechnologiesSearch";
import  TechnologiesControl from "./TechnologiesControl";
import  TechnologiesAddForm from "./TechnologiesAddForm";

class Technologies extends Component {
    constructor() {
        super();
        this.technologiesSearch = this.technologiesSearch.bind(this);
        this.saveTechnologie = this.saveTechnologie.bind(this);
    }
    componentWillMount(){
        this.props.initTechnology();
    }

    technologiesSearch(text){
        let listOfTechnologiesFiltered = [];
        let listOfTechnologies = this.props.stateFromReducer.TechnologiesReducer.listOfTechnologies;
        listOfTechnologies.forEach(function (el, indx) {
            if(text !== '') {
                if (el.techName.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                    listOfTechnologiesFiltered = [...listOfTechnologiesFiltered, listOfTechnologies[indx]];
                }
            }
        });
        this.props.searchTechnology({
            listOfTechnologies: listOfTechnologies,
            listOfTechnologiesFiltered: listOfTechnologiesFiltered
        })
    }

    saveTechnologie(data){
       this.props.saveTechology(data);
    }

    render() {
        let list;
        const {listOfTechnologies,listOfTechnologiesFiltered}
        = this.props.stateFromReducer.TechnologiesReducer;
        if(listOfTechnologiesFiltered.length > 0){
            list = listOfTechnologiesFiltered;
        }else{
            list = listOfTechnologies;
        }
        return (
            <div className="technologiesTab">
                <nav className="technologiesnav nav">
                    <TechnologiesSearch technologiesSearch={this.technologiesSearch}/>
                    <TechnologiesControl />
                </nav>
                <TechnologiesList listOfTechnologies={list}/>
                <TechnologiesAddForm saveTechnologie={this.saveTechnologie}/>
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
