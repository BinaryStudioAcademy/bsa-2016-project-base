import React from "react"
import {PropTypes} from "react"
import {Button, Modal, FormControl} from "react-bootstrap"
export default class AddTechComponent extends React.Component {
    constructor() {
        super()
        this.nameInputHandler = this.nameInputHandler.bind(this)
        this.descriptionInputHandler = this.descriptionInputHandler.bind(this);
        this.state = this.getInitialState()
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.save = this.save.bind(this)
    }

    static get propTypes() {
        return {
            newTech: PropTypes.object.isRequired,
            addTech: PropTypes.func.isRequired,
            modifyTech: PropTypes.func.isRequired
        }
    }

    getInitialState() {
        return {showModal: false};
    }

    close() {
        this.setState({showModal: false});
    }

    save() {
        let {newTech, addTech} = this.props;
        this.close();
        addTech(newTech)
    }

    open() {
        this.setState({showModal: true});
    }

    nameInputHandler(e) {
        this.props.modifyTech({techName: e.target.value})
    }

    descriptionInputHandler(e) {
        this.props.modifyTech({techDescription: e.target.value})
    }

    render() {
        let {techName, techDescription} = this.props.newTech;
        return (
            <div>
                <Button
                    justified
                    bsStyle="default"
                    bsSize="large"
                    onClick={this.open}>
                    Add new technology
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Technology</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Name:</label>
                        <FormControl
                            type="text"
                            placeholder="Enter name"
                            value={techName}
                            onChange={this.nameInputHandler}
                        />
                        <label>Description:</label>
                        <FormControl
                            type="text"
                            placeholder="Enter description"
                            value={techDescription}
                            onChange={this.descriptionInputHandler}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button bsStyle="primary" onClick={this.save}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}