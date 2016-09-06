import React, { Component, PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/Feature.sass';
import {toastr} from 'react-redux-toastr'
class Feature extends Component {
    constructor(props) {
        super(props);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
    }
    sendDeleteRequest() {
        const toastrConfirmOptions = {
            onOk: () => this.props.removeFeature(this.props.feature._id),
            onCancel: () => ''
        };
        toastr.confirm('Are you sure about that?', toastrConfirmOptions)
    }
    render() {
        const {feature,  isActive, onClick} = this.props;
        console.log('isActive ',isActive);
        return (
            <div
                className={styles["feature"]}
                onClick={onClick && ((e) => onClick(e, feature._id))}>
                <div className={( isActive ? styles["active"] : '' )} >
                    {feature.featureName}
                </div>
                <Button
                    className={styles["btnIcon"] + ' ' + styles["btnFeature"]}
                    label='Remove'
                    onClick={this.sendDeleteRequest}
                >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
            </div>
        );
    }
}

Feature.propTypes = {
    feature: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func
};

export default Feature;