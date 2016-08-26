import React, {Component, PropTypes} from 'react';
import {Grid, FormControl, Row, Col, Button} from 'react-bootstrap';
import RaisedButtonUI from '../../common/RaisedButton-ui.js';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styles from  './styles.sass';

const muiTheme = getMuiTheme({
    checkbox: {
        boxColor: '#8D97A4',
        checkedColor: "#2ecc71",
        width: "auto"
    },
});

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
<<<<<<< HEAD
            <div className="section-control">
                <div className="checkAndButton">
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <Checkbox
                            label="Mark all"
                            id = "delete_all"
                            onClick={this.setAllChecked}
                            defaultChecked={this.state.checked}
                            labelStyle={{
                                width: "auto",
                                color: '#8D97A4 !important',
                                fontFamily: "Lato, sans-serif",
                                fontSize: "0.9rem"
                            }}
                            iconStyle={{
                                marginRight: "10px"
                            }}
                        />
                    </MuiThemeProvider>
                    <Button
                        className="technologies-btn-remove"
                        label='Remove'
                        onClick={this.sendDeleteRequest}
                    >Remove</Button>
                </div>
                <div className="addButton">
                    <RaisedButtonUI
                        label={(this.state.formState === 'hidden') ? 'Add' : 'Hide Form'}
                        onClick={this.showAddForm}
                        style={{display: 'inline-block', margin: '0'}}
                    />
                </div>
            </div>
=======
            <Col xs={12} sm={12} md={8}>
                <Col xs={12} sm={12} md={8}>
                    <FormControl className={styles['select-all-checkbox']} onChange={this.setAllChecked}
                                 checked={this.state.checked} id="delete_all"
                                 type="checkbox"/>
                    <label htmlFor="delete_all"
                           className={styles['select-all-label']}>{(this.state.checked === true) ? 'Uncheck all' : 'Check all'}</label>
                    <Button onClick={this.sendDeleteRequest} className={styles['button-feature-remove']}>Remove</Button>
                </Col>
                <Col xs={12} sm={12} md={4}>
                    <Button onClick={this.showAddForm}
                            className={styles['button-feature-add']}>{(this.state.formState === 'hidden') ? 'Add' : 'Hide Form'}</Button>
                </Col>
            </Col>



>>>>>>> develop-demo
        )
    }
}
;


export default TechnologiesTab;
