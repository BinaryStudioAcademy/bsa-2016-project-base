import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, ButtonToolbar} from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles/Sections.sass';

import * as actionsSection from "../../../actions/admin/SectionsActions";

class SectionsListItem extends Component {
    constructor(props) {
        super(props);
        this.handlerChangeCheckedSection = this.handlerChangeCheckedSection.bind(this);
    }

    handlerChangeCheckedSection(e) {
        this.refs.selectCheckboxSection.checked = !this.refs.selectCheckboxSection.checked;
        this.props.changeCheckedSection(this.refs.selectCheckboxSection.checked, this.props.section._id, this.props.sectionsData.sections.length);
    }

    render() {
        return (
            <Row className="SectionListItem">
                <Col  xs={3} sm={3}>
                    <div className={styles['list-item-navigation']}>
                        <div className="nameSectionCheckbox">
                            <input type="checkbox" className={styles['select-checkbox'] + ' ' + "form-control"} ref="selectCheckboxSection"
                                 name="checkbox" id={this.props.section._id} /*checked={item['checked']}*/
                                  checked={this.props.check}
                            />
                            <span htmlFor={this.props.section._id} ref="selectLabel" onClick={this.handlerChangeCheckedSection} className={styles['select-label']}>
                                Name: {this.props.section.name}
                            </span>
                        </div>
                        <div>
                        </div>
                    </div>
                </Col>
                <Col  xs={6} sm={6}>
                    <span className="descriptionSection">{this.props.section.description}</span>
                    </Col>
                <Col  xs={2} sm={2}>
                    <ButtonToolbar className="listItemButtonToolbar">
                    <Button onClick={() => this.props.openSectionDetails(this.props.section)} block className="bShowSectionDetails">Show</Button>
                    <Button onClick={() => this.props.openEditSection(this.props.section)} block>Edit</Button>
                        </ButtonToolbar>
                </Col>
            </Row>
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
const SectionsListItemConnected = connect(mapStateToProps, mapDispatchToProps)(SectionsListItem);
export default SectionsListItemConnected;