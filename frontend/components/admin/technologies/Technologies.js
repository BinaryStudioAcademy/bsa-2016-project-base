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
        this.setAllChecked = this.setAllChecked.bind(this);
        this.deleteChecked = this.deleteChecked.bind(this);
    }
    componentWillMount(){
        this.props.getTechnologies();
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

    setAllChecked(action){
        const {listOfTechnologies}
            = this.props.stateFromReducer.TechnologiesReducer;
        let data_ids = [];
        if(action ==='add') {
            listOfTechnologies.forEach(function (el, indx) {
                data_ids = [...data_ids, el._id];
            });
        }else{
            data_ids = [];
        }
        this.props.selectAllTechs(data_ids,action);
    }
    deleteChecked(){
        const {listOfTechnologiesChecked} = this.props.stateFromReducer.TechnologiesReducer;
        this.props.removeSelectedTechs(listOfTechnologiesChecked);
    }


    saveTechnologie(data){
       this.props.saveTechology(data);
    }

    render() {
        let list;
        const {listOfTechnologies,listOfTechnologiesFiltered,listOfTechnologiesChecked,allChecked}
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
                    <TechnologiesControl deleteChecked={this.deleteChecked}   setAllChecked={this.setAllChecked}/>
                </nav>
                <TechnologiesList listOfTechnologies={list} allChecked={allChecked}/>
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
