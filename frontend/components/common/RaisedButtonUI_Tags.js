import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  margin: 12,
};

const RaisedButtonUI = ({id, label, onClick, style, backgroundColor}) => (
  <div className='button-add-tags'>
    <MuiThemeProvider>
      <RaisedButton
        id={id}
        label={label}
        onTouchTap={onClick}
        onClick={onClick}
        style={style}
        labelStyle={{
            color: '#fff',
            fontFamily: 'Lato, sans-serif',
            fontSize: '0.9rem',
            textTransform: 'none'
        }}
        backgroundColor= {backgroundColor}
      />
    </MuiThemeProvider>
  </div>
);

export default RaisedButtonUI;