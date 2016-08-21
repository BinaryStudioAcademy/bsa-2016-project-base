/*Batarey*/
import React, {Component} from 'react';

import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styles from './styles/checkbox.sass';




const muiTheme = getMuiTheme({
  checkbox: {
    boxColor: '#8D97A4',
    checkedColor: "#2ecc71",
  },
});
export default class CheckBox extends Component {
    constructor(props){
        super(props)
        this.state={checked:false};
    }
    onChecked(arg){
        this.setState({checked:!this.state.checked})

    }
    render() {
        const { label} = this.props;
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Checkbox
                        label={label}
                        checked={this.props.isAllChecked}
                        onClick={this.props.selectAll}
                        labelStyle={{
                            color: '#555',
                            fontFamily: 'Play',
                            width: "calc(100% - 30px)",
                            color: '#8D97A4',
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