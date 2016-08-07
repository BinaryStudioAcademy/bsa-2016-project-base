import React, { Component } from 'react';
import { Modal, Glyphicon, Button } from 'react-bootstrap';
import * as styles from "./DetailsFeature.sass"

export default class DetailsFeature extends Component {

    static propTypes = {
        showModal: React.PropTypes.bool.isRequired,
        feature: React.PropTypes.object.isRequired,
        closeModal: React.PropTypes.func.isRequired,
        subfeatures: React.PropTypes.array
    };

    render() {

        const { showModal, closeModal, feature, subfeatures } = this.props;

        return (
        ( feature._id )?
            <Modal show={ showModal } onHide={ closeModal } className={ styles.modal } >
                <Modal.Header closeButton className={ (feature.isImplemented )? styles.modalHeaderCompleted: styles.modalHeaderInprogress } >
                    <Glyphicon glyph="time" className={styles.glyphDate}/>
                    <span className={styles.createdDate}>{(feature.created)? feature.created.split('T')[0]: null}</span>
                    <Modal.Title className={ styles.modalTitle } >
                        <span>{ feature.featureName }</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Description</h4>
                    <p>{ feature.featureDescription.lists }</p>

                    {( !!subfeatures )? subfeatures.map( subfeature => {
                        return (
                            <div key = { subfeature._id }>
                                <h4>
                                    <Glyphicon glyph = {(subfeature.isImplemented)? "ok": "cog"} className={ (subfeature.isImplemented)? styles.glyphOk: styles.glyphRefresh } />&nbsp;
                                    Subfeature: { subfeature.featureName }
                                    <Glyphicon glyph = {(subfeature.isNecessary && !subfeature.isImplemented)? "asterisk": ""} className={ (subfeature.isNecessary)? styles.glyphRequire: '' } />&nbsp;
                                </h4>
                                <p>
                                { subfeature.featureDescription.lists }
                                </p>
                            </div>
                        )}
                    ): null}
                </Modal.Body>
                <Modal.Footer className={ styles.modalFooter } >
                    <Button onClick={ closeModal } className={ styles.closeButton } >Close</Button>
                </Modal.Footer>
            </Modal>: null
        )
    }
}