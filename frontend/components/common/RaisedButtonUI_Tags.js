import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const RaisedButtonUI = ({id, label, onClick, style, backgroundColor, className}) => (
  <div className={className}>
    <MuiThemeProvider>
      <RaisedButton
        id={id}
        label={label}
        // onTouchTap={onAdd}
        onClick={onClick}
        style={style}
        labelStyle={{
            color: '#fff',
            fontFamily: 'Lato, sans-serif',
            fontSize: '0.9rem',
            textTransform: 'none'
        }}
        backgroundColor= {backgroundColor || '#627484'}
        className={className}
      />
    </MuiThemeProvider>
  </div>
);

export default RaisedButtonUI;