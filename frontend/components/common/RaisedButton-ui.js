import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  margin: 12,
};

const RaisedButtonUI = ({id, label, onClick, style}) => (
  <div>
    <MuiThemeProvider>
      <RaisedButton
          type="submit"
        id={id}
        label={label}
        onTouchTap={onClick}
        style={style}
        labelStyle={{
            color: '#fff',
            fontFamily: 'Lato'
        }}
        backgroundColor='#627484'
      />
    </MuiThemeProvider>
  </div>
);

export default RaisedButtonUI;