import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
  errorStyle: {
    color: '#fc5a5a',
  },
  underlineStyle: {
    borderColor: '#627484',
  },
  underlineFocusStyle: {
    borderColor: '#2196F3',
  },
  floatingLabelStyle: {
    color: '#627484',
  },
  floatingLabelFocusStyle: {
    color: '#2ecc71',
  }
};

const TextFieldUI = ({hintText, defaultValue, onChange, style, inputStyle}) => {
    return (
        <div>
        <MuiThemeProvider>
            <TextField
              hintText={hintText}
              defaultValue={defaultValue}            
              onChange={onChange}
              style={style}
              inputStyle={{
                  color: '#555',
                  fontFamily: 'Play'
              }}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
          </MuiThemeProvider>
        </div>
    );
};

export default TextFieldUI;