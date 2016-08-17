import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { FormControl, Col, Button} from 'react-bootstrap';
import * as actionsSection from "../../../actions/admin/SectionsActions";
import styles from './styles/Sections.sass';

class SectionsToolBar extends Component {
    constructor(props) {
        super(props);
        this.removeChecked = this.removeChecked.bind(this);
        this.markAllSections = this.markAllSections.bind(this);
        this.handlerFilterSections = this.handlerFilterSections.bind(this);
        this.handlerChangeVisibilityForm = this.handlerChangeVisibilityForm.bind(this);
    }

    handlerChangeVisibilityForm() {
        this.props.changeVisibilityFormSections(this.props.sectionsData.visibilityForm);
    }

    removeChecked() {
        let {listCheckedSections} = this.props.sectionsData;
        this.props.removeSections(listCheckedSections);
        this.props.getAllSections();
    }

    markAllSections(e) {

        this.props.markedAllSections(this.props.sectionsData.sections, e.target.checked, this.props.sectionsData.listCheckedSections);
    }

    handlerFilterSections(e) {
        this.props.filterSections(e.target.value);
    }

    render() {
        var self = this;
        return (
            <div>
                <div className={styles['sections-tool-bar']}>
                    <Col xs={12} sm={4} >
                        <div className={styles['search-input-container']}>
                            <FormControl className={styles['search-input']}
                                         type="text" placeholder="Search" onChange={this.handlerFilterSections}
                                         id="SectionSearchInput"
                            />
                            <span className={styles['search-input-border']}></span>
                        </div>
                    </Col>
                    <Col xs={12} sm={8}>
                        <FormControl type="checkbox" className={styles['select-all-checkbox']}
                                     id="markAllSections"  onChange={this.markAllSections}
                                     checked={this.props.sectionsData.sections.length == this.props.sectionsData.listCheckedSections.length
                                     && this.props.sectionsData.sections.length != 0}
                        />
                        <label htmlFor="markAllSections" className={styles['select-all-label']}>Mark all</label>
                        <Button className={styles['button-section-remove']} onClick={this.removeChecked} id="buttonSectionRemove">Remove marked</Button>
                        <Button className={styles['button-section-add']} id="buttonSectionAdd" onClick={this.handlerChangeVisibilityForm}>{
                            this.props.sectionsData.visibilityForm === "hidden" ? "Add" : "Hide form"}</Button>
                    </Col>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsSection, dispatch);
}

function mapStateToProps(state) {
    return {
        sectionsData: state.SectionsReducer
    };
}

const  SectionsToolBarConnected = connect(mapStateToProps, mapDispatchToProps)(SectionsToolBar);
export default  SectionsToolBarConnected;
