import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from "../../../actions/admin/TechnologiesActions";
import  TechnologiesList from "./TechnologiesList";
import  TechnologiesSearch from "./TechnologiesSearch";
import  TechnologiesControl from "./TechnologiesControl";
import  TechnologiesAddForm from "./TechnologiesAddForm";
import { Grid, Row, Panel } from 'react-bootstrap';
import styles from  './styles.sass';
import ReduxToastr, {toastr} from 'react-redux-toastr'
class Technologies extends Component {
    constructor() {
        super();
        this.technologiesSearch = this.technologiesSearch.bind(this);
        this.saveTechnologie = this.saveTechnologie.bind(this);
        this.setAllChecked = this.setAllChecked.bind(this);
        this.deleteChecked = this.deleteChecked.bind(this);
        this.formAddControlState = this.formAddControlState.bind(this);
        this.controlCheckeditems = this.controlCheckeditems.bind(this);
    }

    componentWillMount() {
        this.props.getTechnologies();
    }

    technologiesSearch(text) {
        let listOfTechnologiesFiltered = [];
        let listOfTechnologies = this.props.stateFromReducer.TechnologiesReducer.listOfTechnologies;
        listOfTechnologies.forEach(function (el, indx) {
            if (text !== '') {
                if (el.techName.toUpperCase().indexOf(text.toUpperCase()) != -1
                    || el.techDescription.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                    listOfTechnologiesFiltered = [...listOfTechnologiesFiltered, listOfTechnologies[indx]];
                }
            }
        });
        this.props.searchTechnology({
            listOfTechnologies: listOfTechnologies,
            listOfTechnologiesFiltered: listOfTechnologiesFiltered
        })
    }

    setAllChecked(action) {
        const {listOfTechnologies}
            = this.props.stateFromReducer.TechnologiesReducer;
        if (action === 'add') {
            listOfTechnologies.forEach(function (el, indx) {
                listOfTechnologies[indx].checked = 'checked';
            });
        } else {
            listOfTechnologies.forEach(function (el, indx) {
                listOfTechnologies[indx].checked = false;
            });
        }
        this.props.selectAllTechs(listOfTechnologies);
    }

    deleteChecked() {
        const {listOfTechnologies} = this.props.stateFromReducer.TechnologiesReducer;
       // this.props.removeSelectedTechs(listOfTechnologies);
        const toastrConfirmOptions = {
            onOk: () => this.props.removeSelectedTechs(listOfTechnologies),
            onCancel: () => ''
        };
        toastr.confirm('Are you sure about that?', toastrConfirmOptions)
    }

    formAddControlState() {
        const {formState}
            = this.props.stateFromReducer.TechnologiesReducer;
        let state;
        if (formState === 'hidden') {
            state = 'visible';
            document.getElementById('addForm').scrollIntoView();

        } else {
            state = 'hidden';
        }
        this.props.setAddFormState(state);
    }

    controlCheckeditems(id, action) {
        const {listOfTechnologies}
            = this.props.stateFromReducer.TechnologiesReducer;
        if (action === 'add') {
            listOfTechnologies.forEach(function (el, indx) {
                if (el._id === id) {
                    listOfTechnologies[indx].checked = 'checked';
                }
            });
        } else {
            listOfTechnologies.forEach(function (el, indx) {
                if (el._id === id) {
                    listOfTechnologies[indx].checked = false;
                }
            });
        }
        this.props.selectAllTechs(listOfTechnologies);
    }


    saveTechnologie(data) {
        this.props.saveTechology(data);
    }

    render() {

        let list;
        const {listOfTechnologies, listOfTechnologiesFiltered, formState}
            = this.props.stateFromReducer.TechnologiesReducer;
        if (listOfTechnologiesFiltered.length > 0) {
            list = listOfTechnologiesFiltered;
        } else {
            list = listOfTechnologies;
        }

        return (
            <div id="technologies" className={styles["technologies-tab"]}>
                <ReduxToastr/>
                <Panel className={styles['technologies-tool-bar']}>
                    <Row className={styles["technologies-tools"]}>
                    <TechnologiesSearch technologiesSearch={this.technologiesSearch}/>
                    <TechnologiesControl formState={formState} formAddControlState={this.formAddControlState}
                                         deleteChecked={this.deleteChecked} setAllChecked={this.setAllChecked}/>
                        </Row>
                </Panel>
                <TechnologiesList listOfTechnologies={list} controlCheckeditems={this.controlCheckeditems}/>
                <TechnologiesAddForm formState={formState} saveTechnologie={this.saveTechnologie}/>
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
