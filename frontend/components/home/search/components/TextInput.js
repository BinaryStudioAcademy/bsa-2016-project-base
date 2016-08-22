import React from "react"
import {PropTypes} from "react"
import TextField from 'material-ui/TextField';

var count = 0;
export default class TextInput extends React.Component {
    constructor() {
        super();
        this.number = ++count;
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
        receiver(e.target.value)
        /*const {autoUpdateTimeoutId} = this.state;
        clearTimeout(autoUpdateTimeoutId);

        const newTimeoutId = setTimeout((value, receiver)=> {
            receiver(value);
        }, 0, e.target.value, receiver);

        this.setState({
                value: e.target.value,
                autoUpdateTimeoutId: newTimeoutId
            }
        )*/
    }
    render() {
        const value = this.state.value === undefined ?
            this.props.value :
            this.state.value;
        const props = Object.assign({},this.props);
        delete props.receiver;
        return React.createElement(TextField, {
            onChange: this.onInputChange.bind(this),
            ...props,
            id:`deferred-input-${this.number}`,
            value
        });
    }
}
