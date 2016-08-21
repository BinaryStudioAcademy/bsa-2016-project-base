import React from "react"
import {PropTypes} from "react"
import TextField from 'material-ui/TextField';


export default class DeferredTextInput extends React.Component {
    constructor() {
        super();
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {
            value:"",
            autoUpdateTimeoutId:0
        }
    }

    static get propTypes() {
        const string = PropTypes.string;
        return {
            value:string.isRequired,
            receiver:PropTypes.func.isRequired
        }
    }
    componentWillReceiveProps(props) {
        this.setState({value: props.value})
    }

    onInputChange(e) {
        const {receiver} = this.props;
        const {autoUpdateTimeoutId} = this.state;
        clearTimeout(autoUpdateTimeoutId);

        const newTimeoutId = setTimeout((value, receiver)=> {
            receiver(value);
        }, 300, e.target.value, receiver);

        this.setState({
                value: e.target.value,
                autoUpdateTimeoutId: newTimeoutId
            }
        )
    }
    render() {
        const value = this.state.value === undefined ?
            this.props.value :
            this.state.value;
        return React.createElement(TextField, {
            onChange: this.onInputChange.bind(this),
            ...this.props,
            value
        });
    }
}
