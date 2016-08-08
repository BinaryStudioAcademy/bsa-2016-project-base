import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import MultiSelect from './MultiSelect';
import {Grid, FormControl, Row, Col, Button} from 'react-bootstrap';
import {markedAllFeatures,filterFeatures} from '../../../actions/FeaturesActions';

import styles from './styles/Features.sass';

class FeaturesToolBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let items = [{
            id:"1",
            name: "item1"
        }, {
            id:"2",
            name: "item2"
        }];
        let sectionItems = new Array();
        for(var i in items) sectionItems.push(
            <div key={items[i].id}>
                <FormControl type="checkbox" className={styles['select-checkbox']}
                   id={items[i].id}  onChange={(e)=>{
                         alert(e.target.attr('id'));
                   }}/>
                <label htmlFor={items[i].id} className={styles['select-label']}>{items[i].name}</label>
            </div>
        );
        return (
            <Grid>
                <Row className={styles['features-tool-bar']}>
                    <Col xs={12} sm={6} md={4} lg={4}>
                        <div className={styles['search-input-container']}>
                            <FormControl className={styles['search-input']}
                               type="text" placeholder="Search" onChange={(e)=>{
                                    this.props.filterFeatures(
                                        e.target.value.trim().replace(/['"]+/g,'').toLowerCase()
                                    );
                               }}
                            />
                            <span className={styles['search-input-border']}></span>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3}>
                        <MultiSelect title="Click for selecting sections ... ">
                            {sectionItems}
                        </MultiSelect>
                    </Col>
                    <Col xs={12} sm={12} md={5} lg={5}>
                        <FormControl type="checkbox" className={styles['select-all-checkbox']}
                             id="markAll"  onChange={(e)=>{
                                this.props.markedAllFeatures(e.target.checked);
                             }}
                        />
                        <label htmlFor="markAll" className={styles['select-all-label']}>Mark all</label>
                        <Button className={styles['button-feature-remove']}>Remove marked</Button>
                        <Button className={styles['button-feature-add']}>Add feature</Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        markedAllFeatures: markedAllFeatures,
        filterFeatures: filterFeatures
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        reduserState: state['FeaturesReducer']
    };
}

const  FeaturesToolBarModifated = connect(mapStateToProps, mapDispatchToProps)(FeaturesToolBar);
export default  FeaturesToolBarModifated;
