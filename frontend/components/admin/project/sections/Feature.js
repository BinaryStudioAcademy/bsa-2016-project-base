import React, { Component, PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/Feature.sass';

class Feature extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {feature,  isActive, onClick} = this.props;
        console.log('isActive ',isActive);
        return (
            <div 
                id={styles["feature"]}  
                onClick={onClick && ((e) => onClick(e, feature._id))}>
                <div className={( isActive ? styles["active"] : '' )} >
                    {feature.featureName}
                </div>
               
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