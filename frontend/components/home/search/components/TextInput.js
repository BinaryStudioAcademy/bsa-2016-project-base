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
            value:undefined,
        }
    }

    static get propTypes() {
        return {
            value:PropTypes.string.isRequired,
            receiver:PropTypes.func.isRequired
        }
    }
    componentWillReceiveProps(props) {
        this.setState({value: props.value})
    }
    onInputChange(e) {
        const {receiver} = this.props;
        receiver(e.target.value)
        this.setState({
                value: e.target.value,
            }
        )
    }
    render() {
        const value = this.state.value === undefined?
            //componentWillReceiveProps don't working on first on first render
            this.props.value:this.state.value;
        const props = Object.assign({},this.props);
        delete props.receiver;
        return React.createElement(TextField, {
            onChange: this.onInputChange,
            ...props,
            id:`deferred-input-${this.number}`,
            value
        });
    }
}
