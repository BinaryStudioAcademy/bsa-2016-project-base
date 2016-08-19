import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import * as styles from "./ListFeatures.sass"

export default class ListFeatures extends Component {

    static propTypes = {
        visibleFeatures: React.PropTypes.array.isRequired,
        modalOpen: React.PropTypes.func.isRequired,
        allFeatures: React.PropTypes.array.isRequired
    };

    render() {

        const { visibleFeatures, modalOpen, allFeatures } = this.props;

        return (
            <ListGroup className={ styles.listgroup }>
                { visibleFeatures.map(feature => {
                    const {childFeatures, featureName, isItSubFeature, isImplemented, section} = feature;
                    let header = (
                        <div>
                            <h4>{featureName}</h4>
                            <p><span>Section: </span>{section.name}</p><hr />
                        </div>);

                    if (isItSubFeature) return false;

                    return (
                        <ListGroupItem
                            key={feature._id} data-id={feature._id}
                            header={ header }
                            className={ (isImplemented)? styles.completedF: styles.incompletedF }
                            onClick={ modalOpen }
                        >
                            <span>{feature.descriptionText}</span>
                            {(childFeatures && childFeatures.length > 0) ? childFeatures.map( id => {
                                const subfeature = allFeatures.filter(feature => feature._id === id)[0];

                                if (subfeature) {
                                    return (
                                        <span key={subfeature._id}>
                                            <Label className={(subfeature.isImplemented)? styles.completed: styles.inprogress}>Subfeature: {subfeature.featureName}</Label>&nbsp;
                                        </span>
                                    )
                                }

                        }) : <span>&nbsp;</span>}
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        )
    }
}