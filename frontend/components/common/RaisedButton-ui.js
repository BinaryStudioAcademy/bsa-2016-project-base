import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  margin: 12,
};

const RaisedButtonUI = ({id, label, onClick, style, href,icon}) => (
  <div>
    <MuiThemeProvider>
      <RaisedButton
        type="submit"
        id={id}
        label={label}
        icon={icon}
        onTouchTap={onClick}
        labelStyle={{
            color: '#fff',
            fontFamily: 'Lato'
        }}
        backgroundColor='#8D97A4'
        href={href}
        style={style}
      />
    </MuiThemeProvider>
  </div>
);

export default RaisedButtonUI;