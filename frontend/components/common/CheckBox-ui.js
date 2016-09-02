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
  }
});

const CheckBoxUI = ({id, label, checked, onCheck, style, className}) => (
    <div className={className}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Checkbox
                label={label}
                checked={checked}
                onCheck={onCheck}                
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
);

export default CheckBoxUI;