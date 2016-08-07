import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../../actions/FeaturesActions";
import * as styles from "./DetailsFeatures.sass"

import { Row, Col, ListGroup, ListGroupItem, FormControl, FormGroup, InputGroup, Modal, Label, Glyphicon, Button } from 'react-bootstrap';


class DetailsFeatures extends Component {

    componentDidMount() {
        this.props.getAllFeatures();
    }
    

    filterFeatures(e) {
        this.props.filterFeaturesDetails(e.target.value);
    }

    open(e) {
        const id = +e.target.closest('button').dataset.id;
        console.log(id);

        this.props.openModal(id);
    }

    close() {
        this.props.closeModal();
    }

    render() {
        const {filtered} = this.props;
        const {search, showFeaturesDetailsId, features} = this.props.data;
        const {closeModal, showModal} = this.props;
        let featuresDetails = {};

        if (!!showFeaturesDetailsId) {
            featuresDetails = features.filter((obj) => obj.id === showFeaturesDetailsId)[0];
        }

        return (
            <div className={styles.wrap}>
                <h3 className="text-center">Features</h3>

                <FormGroup>
                    <InputGroup>
                        <FormControl
                            className={styles.search}
                            type="text"
                            placeholder="Type to filter..."
                            onInput ={ ::this.filterFeatures }
                            value={ search }
                        />
                        <InputGroup.Addon className={styles.searchSign}>
                            <Glyphicon glyph="search" className={styles.searchIcon} />
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>

                <ListGroup className={styles.listgroup}>
                    {filtered.map((feature) => {
                        const {childFeatures, featureName} = feature;
                        return (
                            <ListGroupItem
                                key={feature.id} data-id={feature.id}
                                header={featureName}
                                className={styles.completedF}
                                onClick={::this.open}
                            >
                                <Label className={styles.completed} >Subfeature 1</Label>&nbsp;
                                <Label className={styles.completed} >Subfeature 1</Label>&nbsp;
                                <Label className={styles.completed} >Subfeature 1</Label>&nbsp;
                                <Label className={styles.inprogress} >Subfeature 1</Label>&nbsp;
                                <Label className={styles.inprogress} >Subfeature 1</Label>&nbsp;
                                <Label className={styles.waiting} >Subfeature 1</Label>&nbsp;
                                <Label className={styles.waiting} >Subfeature 1</Label>&nbsp;
                                <Label className={styles.waiting} >Subfeature 1</Label>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>

                <Modal show={showModal} onHide={closeModal} className={styles.modal} >
                    <Modal.Header closeButton className={styles.modalHeader} >
                        <Modal.Title className={styles.modalTitle} >
                            <Glyphicon glyph="ok" className={styles.glyphOk} />&nbsp;
                            {featuresDetails.featureName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Ferri aeterno vocibus eu sea, idque fabulas mnesarchum mel eu. Has cu nibh everti copiosae. Consul viderer veritus in eos, ex nec dolores efficiantur. Noluisse argumentum et mei. Sit utroque accusam no. Mel legere appareat quaestio no, ne quando integre eum, ut qui labitur delenit vituperatoribus. Ne viderer persequeris has.</p>
                        <h4>
                            <Glyphicon glyph="ok" className={styles.glyphOk} />&nbsp;
                            Subfeature 1
                        </h4>
                        <p>Sit ex conceptam definitiones. Ad usu oporteat evertitur, idque equidem liberavisse eu eam, no vim etiam mundi liberavisse. Ei nam numquam imperdiet theophrastus. Et facete vocibus complectitur qui, mei id etiam elitr. Inani paulo mandamus pro at, quas habeo singulis ut duo, usu ne audiam salutatus. Solum primis perpetua per ex, sea minim quando perpetua an. Est iisque salutatus in, est natum antiopam eu, vix ad possim eirmod.</p>
                        <h4>
                            <Glyphicon glyph="refresh" className={styles.glyphRefresh} />&nbsp;
                            Subfeature 2
                        </h4>
                        <p>His bonorum periculis ea. Corpora ocurreret appellantur qui id, ex quas errem accumsan vel, quo praesent laboramus cu. Ad quo vero eloquentiam, ad pri quis malis efficiendi, mea omittantur dissentiunt ea. Sapientem conceptam at sit, mea periculis reprehendunt no.</p>
                        <h4>
                            <Glyphicon glyph="time" className={styles.glyphTime} />&nbsp;
                            Subfeature 3
                        </h4>
                        <p>Aliquam legimus ut nec. Sea lucilius convenire ei, vidit omnes complectitur ut eam, ipsum iracundia intellegam pri ut. Ex est case postulant, cum augue labores te. Per id nostrum recusabo, pri an homero primis. Eos te alii mollis melius, sit ea viris tamquam blandit, dicam honestatis eum ei.</p>
                    </Modal.Body>
                    <Modal.Footer className={styles.modalFooter} >
                        <Button onClick={closeModal} className={styles.closeButton} >Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    const { features, search, showFeaturesDetailsModal } = state.FeaturesDetailsReducer;
    const myReg = new RegExp('^' + search, "i");

    let filtered = (!search) ? features: features.filter((feature) => myReg.test(feature.featureName));

    return {
        data: state.FeaturesDetailsReducer,
        filtered: filtered,
        showModal: showFeaturesDetailsModal
    };
}

const DetailsFeaturesConnected = connect(mapStateToProps, mapDispatchToProps)(DetailsFeatures);
export default DetailsFeaturesConnected;