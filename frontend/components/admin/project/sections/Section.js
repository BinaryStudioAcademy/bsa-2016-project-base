import React, { Component, PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/Section.sass';

class Section extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {section,  isActive, onClick} = this.props;
        console.log('isActive ',isActive);
        return (
            <div 
                className={styles["section"]}  
                onClick={onClick && ((e) => onClick(e, section._id))}>
                <div className={( isActive ? styles["active"] : '' )} >
                    {section.name}
                </div>
               
            </div>
        );
    }
}

Section.propTypes = {
    section: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Section;