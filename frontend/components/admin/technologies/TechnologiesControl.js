import React, {Component, PropTypes} from 'react';
import {Grid, FormControl, Row, Col, Button} from 'react-bootstrap';
import styles from  './styles.sass';
class TechnologiesTab extends Component {
    constructor(props) {
        super(props);
        this.setAllChecked = this.setAllChecked.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
        this.state = {
            checked: false,
            formState: this.props.formState
        }
    }

    sendDeleteRequest() {
        this.props.deleteChecked();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formState: nextProps.formState
        });
    }

    setAllChecked(e) {
        let action = e.target.checked ? 'add' : 'delete';
        this.setState(
            {
                checked: e.target.checked
            }
        );
        this.props.setAllChecked(action);
    }

    showAddForm() {
        this.props.formAddControlState();
    }

    render() {
        return (
            <Col xs={12} sm={12} md={8}>
                <Col xs={12} sm={12} md={8}>
                    <FormControl className={styles['select-all-checkbox']} onChange={this.setAllChecked}
                                 checked={this.state.checked} id="delete_all"
                                 type="checkbox"/>
                    <label htmlFor="delete_all"
                           className={styles['select-all-label']}>{(this.state.checked === true) ? 'Uncheck all' : 'Check all'}</label>
                    <Button onClick={this.sendDeleteRequest} className={styles['button-feature-remove']}>Delete all
                        checked</Button>
                </Col>
                <Col xs={12} sm={12} md={4}>
                    <Button onClick={this.showAddForm}
                            className={styles['button-feature-add']}>{(this.state.formState === 'hidden') ? 'Add' : 'Hide Form'}</Button>
                </Col>
            </Col>



        )
    }
}
;


export default TechnologiesTab;
