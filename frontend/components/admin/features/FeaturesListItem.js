import React, { Component, PropTypes } from 'react';
import {FormControl, Row, Col} from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles/Features.sass';

import {changeFeature} from '../../../actions/FeaturesActions'

class FeaturesListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var item = this.props['reduserState'].features[
            this.props['reduserState'].features.findIndex(
                (item)=>(this.props['data-id'] == item.id)
            )
        ];
        return (
            <Row>
                <Col  xs={5} sm={3} md={3} lg={3}>
                    <div className={styles['list-item-navigation']}>
                        <div>
                            <FormControl type="checkbox" className={styles['select-checkbox']}
                                 name="checkbox" id={item['id']} checked={item['checked']}
                                 onChange={()=>{ this.props.changeFeature(item['id']); }}
                            />
                            <label htmlFor={item['id']} className={styles['select-label']}>
                                {item['featureName']}
                            </label>
                        </div>
                        <div>
                            <span>Section: </span>
                            <label>{item['section']}</label>
                        </div>
                    </div>
                </Col>
                <Col  xs={7} sm={9} md={9} lg={9}>{item['description']}</Col>
            </Row>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFeature: changeFeature
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        reduserState: state['FeaturesReducer']
    };
}
const FeaturesListItemModifated = connect(mapStateToProps, mapDispatchToProps)(FeaturesListItem);
export default FeaturesListItemModifated;