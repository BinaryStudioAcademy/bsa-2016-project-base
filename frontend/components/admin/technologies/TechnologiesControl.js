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
            <div className="section-control">
                <Col xs={12} sm={12} md={9} className="checkAndButton">
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <Col md={4} class="delete_all_container">
                        <Checkbox
                            label="Mark all"
                            id = "delete_all"
                            onClick={this.setAllChecked}
                            defaultChecked={this.state.checked}
                            labelStyle={{
                                width: "calc(100% - 30px)",
                                color: '#8D97A4 !important',
                                fontFamily: "Lato, sans-serif",
                                fontSize: "0.9rem"
                            }}
                            iconStyle={{
                                marginRight: "10px"
                            }}
                        />
                            </Col>
                    </MuiThemeProvider>
                    <Col md={5}>
                    <Button
                        Remove
                        className="technologies-btn-remove"
                        label='Remove'
                        onClick={this.sendDeleteRequest}
                    >Remove</Button>
                        </Col>
                </Col>
                <Col xs={12} sm={12} md={3}>
                    <RaisedButtonUI
                        label={(this.state.formState === 'hidden') ? 'Add' : 'Hide Form'}
                        onClick={this.showAddForm}
                        style={{display: 'inline-block', margin: '0'}}
                    />
                </Col>
            </div>
        )
    }
}
;


export default TechnologiesTab;
