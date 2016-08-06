import React, { Component, PropTypes } from 'react';
import {Grid}  from 'react-bootstrap';
import FeaturesListItem from './FeaturesListItem';

import styles from './styles/Features.sass';

class FeaturesList extends  Component {
    constructor(props) {
        super(props);
    }
    render() {
        let items =[{
            name :"Feature 1",
            description: "",
            section:"WEB"
        },{
            name :"Feature 2",
            section:"Xamarine"
        },{
            name :"Feature 3",
            section:"Xamarine",
            description:"Съешь ещё этих мягких французских булок, да выпей же чаю"
        }];
        let featuresItems = new Array();
        for(var i in items) featuresItems.push(
            <FeaturesListItem key={i} data-id={i}
                              name={items[i].name}
                              section={items[i].section}
                              description={items[i].description}
            />);
        return (<Grid className={styles['list-container']}>{featuresItems}</Grid>);
    }
}

export default FeaturesList