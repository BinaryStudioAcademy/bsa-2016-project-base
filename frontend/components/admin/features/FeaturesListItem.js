import React, { Component, PropTypes } from 'react';
import {FormControl, Row, Col} from 'react-bootstrap';

import styles from './styles/Features.sass';

class FeaturesListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row>
                <Col  xs={5} sm={3} md={3} lg={3}>
                    <div className={styles['list-item-navigation']}>
                        <div>
                            <FormControl type="checkbox" className={styles['select-feature-checkbox']}
                                         name="checkbox" id={this.props['data-id']}
                                         onChange={(e)=>{
								 }}
                            />
                            <label htmlFor={this.props['data-id']} className={styles['select-feature-label']}>
                                {this.props['name']}
                            </label>
                        </div>
                        <div>
                            <span>Section: </span>
                            <label>{this.props['section']}</label>
                        </div>
                    </div>
                </Col>
                <Col  xs={7} sm={9} md={9} lg={9}>
                    {this.props['description']}
                </Col>
            </Row>
        )
    }
}

export default FeaturesListItem