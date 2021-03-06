import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const RaisedButtonUI = ({id, label, disabled, onClick, style, backgroundColor, className}) => (
  <div className={className}>
    <MuiThemeProvider>
      <RaisedButton
        id={id}
        label={label}
        disabled={disabled}
        // onTouchTap={onAdd}
        onClick={onClick}
        style={style}
        labelStyle={{
            color: '#fff',
            fontFamily: 'Lato, sans-serif',
            fontSize: '0.9rem',
            textTransform: 'none'
        }}
        backgroundColor= {backgroundColor || '#8D97A4'}
        className={className}
      />
    </MuiThemeProvider>
  </div>
);

export default RaisedButtonUI;