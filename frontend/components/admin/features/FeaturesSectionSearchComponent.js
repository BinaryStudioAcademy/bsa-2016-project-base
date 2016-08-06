import React, { Component, PropTypes } from 'react';
import { FormControl} from 'react-bootstrap';

import styles from './styles/Features.sass';

class FeaturesSectionSearchComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <FormControl className={styles['section-input']} type="text" />
                <div className={styles['sections-list']}></div>
            </div>
        )
    }
}

export default FeaturesSectionSearchComponent