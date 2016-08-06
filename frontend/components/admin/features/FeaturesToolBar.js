import React, { Component, PropTypes } from 'react';
import {Grid, FormControl, Row, Col, Button} from 'react-bootstrap';
import FeaturesSectionSearchComponent from './FeaturesSectionSearchComponent'
import styles from './styles/Features.sass';

class FeaturesToolBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let items = { item1: "item1",item2: "item2"};
        let sectionItems = new Array();
        for(var i in items) sectionItems.push(<option key={i} value={i}>{items[i]}</option>);
        return (
            <Grid>
                <Row className={styles['features-tool-bar']}>
                    <Col xs={3} sm={2} md={4} lg={4}>
                        <div className={styles['search-input-container']}>
                            <FormControl className={styles['search-input']} ref="search-feature" type="text" placeholder="Search" />
                            <span className={styles['search-input-border']}></span>
                        </div>
                    </Col>
                    <Col xs={3} sm={4} md={3} lg={3}>
                        <FeaturesSectionSearchComponent />
                    </Col>
                    <Col xs={6} sm={6} md={5} lg={5}>
                        <FormControl type="checkbox" className={styles['select-all-checkbox']} name="checkbox" id="select-all"/>
                        <label htmlFor="select-all" className={styles['select-all-label']}>Mark all</label>
                        <Button className={styles['button-feature-remove']}>Remove marked</Button>
                        <Button className={styles['button-feature-add']}>Add feature</Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
export default  FeaturesToolBar
