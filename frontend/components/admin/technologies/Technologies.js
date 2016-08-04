import React, { Component, PropTypes } from 'react';
import {Grid, Col, Row} from "react-bootstrap"
import SelectAllTechsButton from "./SelectAllTechsButton"
import AddTechComponent from "./AddTechComponent"
import ExudingTextComponent from "./ExudingTextComponent"
class TechnologiesTab extends Component {
    constructor(props) {
        super(props);
        this.searchInputChangeHandler =
            this.searchInputChangeHandler.bind(this);
        this.removeSelectedButtonClickHandler =
            this.removeSelectedButtonClickHandler.bind(this)
        this.props.getTeches();
    }

    checkBoxChangeHandler(key) {
        this.props.toggleTechSelect(this.props.store.TechnologiesReducer.techs[key]);
    }

    searchInputChangeHandler(e) {
        this.props.modifySearchPattern(e.target.value)
        //should be called by button?
        this.props.searchTech(e.target.value)
    }

    removeSelectedButtonClickHandler() {
        this.props.removeSelectedTechs()
    }


    getTechComponents() {     //dont working without .TechAdminReducer
        let {searchPattern: pattern, techs} = this.props.store.TechnologiesReducer;
        if (pattern) pattern = pattern.toLowerCase();
        return techs
        /*do filter as demo*/
            .filter((tech)=> {
                if (!pattern) return true;
                return tech.techName && (tech.techName.toLowerCase().indexOf(pattern) > -1) ||
                    tech.techDescription && (tech.techDescription.toLowerCase().indexOf(pattern) > -1)
            })
            /*filter*/
            .map((tech, index)=> {
                return (
                    <Col md={4} key={index}>
                        <input type="checkbox" checked={tech.isSelected}
                               onChange={this.checkBoxChangeHandler.bind(this, index)}/>
                        <img src="http://strojekodom.ru/images/ikons_menu/technology2.png"/>
                        <ExudingTextComponent text={tech.techName} pattern={pattern}/>
                        <small>
                            <ExudingTextComponent text={tech.techDescription} pattern={pattern}/>
                        </small>
                    </Col>)
            })
    };

    getTechComponentRows(colsInRow = 3) {
        let techComponents = this.getTechComponents();
        let rows = [];
        for (let i = 0; i < techComponents.length; i += colsInRow) {
            let cols = [];
            for (let j = 0; j < colsInRow && i + j < techComponents.length; j++) {
                cols.push(techComponents[i + j])
            }
            rows.push(<Row key={i/3} className="show-grid">{cols}</Row>)
        }
        return rows;
    }

    render() {
        let {searchPattern, techs, newTech} = this.props.store.TechnologiesReducer;
        let {selectAllTechs, unselectAllTechs, modifyNewTech, addTech, newTech} = this.props;
        return (
            <div className="techTab">
                <h2>Add/Edit Technologies</h2>
                <input placeholder="Search"
                       value={searchPattern}
                       onChange={this.searchInputChangeHandler}/>
                <SelectAllTechsButton
                    selectAll={selectAllTechs}
                    unselectAll={unselectAllTechs}
                    areAllSelected={techs.reduce((res, tech)=>(res && tech.isSelected), true)}/>
                <button onClick={this.removeSelectedButtonClickHandler}>
                    Remove selected
                </button>
                <AddTechComponent
                    addTech={addTech}
                    newTech={newTech}
                    modifyTech={modifyNewTech}
                />
                <Grid>
                    {this.getTechComponentRows()}
                </Grid>

            </div>
        )
    }
}
//connect
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "./../../../actions/TechnologiesActions"
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

let TechTabConnected = connect(mapStateToProps, mapDispatchToProps)(TechnologiesTab);
//no custom props, only action creators and store
/*TechTab.propTypes = {
 tech: PropTypes.array.isRequired,
 addTech: PropTypes.func.isRequired,
 removeTech: PropTypes.func.isRequired
 };*/
export default TechTabConnected;


