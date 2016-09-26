/*Batarey*/
import React, {Component} from 'react';

import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    checkbox: {
        boxColor: '#8D97A4',
        checkedColor: "#2ecc71",
    },
});

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
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Checkbox
                        label={label}
                        id = {id}
                        onClick={this.handleCheck}
                        checked={checked}
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
                </MuiThemeProvider>

            </div>
        )
    }
}