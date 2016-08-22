/*Batarey*/
import React, {Component} from 'react';

import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class CheckBox extends Component {
    constructor(props){
        super(props);
        this.handleCheck = this.handleCheck.bind(this)
    }

    handleCheck(e){
        const {id} = this.props;
        this.props.onChange(id, e.target.checked)
    }
    render() {
        const {label, id, checked} = this.props;
        return (
            <div>
                <MuiThemeProvider>
                    <Checkbox
                        label={label}
                        id = {id}
                        onClick={this.handleCheck}
                        defaultChecked={checked}
                        labelStyle={{
                            color: '#555',
                            fontFamily: 'Play'
                        }}
                        iconStyle={{
                            fill: '#2ecc71'
                        }}
                    />
                </MuiThemeProvider>

            </div>
        )
    }
}