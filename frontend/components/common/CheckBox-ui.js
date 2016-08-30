/*Batarey*/
import React, {Component} from 'react';

import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './styles/checkbox.sass';

export default class CheckBox extends Component {
    constructor(props){
        super(props)
        this.state={checked:false};
    }
    handleCheck(arg){
        this.setState({checked:!this.state.checked})
    }
    render() {
        const {label, onChange} = this.props;
        return (
            <div>
                <MuiThemeProvider>
                    <Checkbox
                        label={label}
                        checked={this.state.checked}
                        onClick={this.handleCheck.bind(this,'click')}
                        onChange={onChange}
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