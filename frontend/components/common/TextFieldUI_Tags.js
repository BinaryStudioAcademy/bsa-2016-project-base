import React, { Component,PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
  errorStyle: {
    color: '#fc5a5a'
  },
  underlineStyle: {
    borderColor: '#D5D7DA'
  },
  underlineFocusStyle: {
    borderColor: '#2ecc71'
  },
  floatingLabelStyle: {
    color: '#627484'
  },
  floatingLabelFocusStyle: {
    color: '#2ecc71'
  },
  inputStyle: {
    color: '#627484',
    fontfamily: 'Lato, sans-serif',
    paddingLeft: ".5rem"
  },
  hintStyle: {
    fontFamily: 'Lato, sans-serif',
    marginLeft: ".5rem",
    fontSize: "0.9rem"
  }



};

class TextFieldTags extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render(){
        const {hintText, defaultValue, onChange, style, inputStyle, onBlur, value} = this.props;
        return (
            <div>
            <MuiThemeProvider>
                <TextField
                  hintText={hintText}
                  defaultValue={defaultValue}
                  onChange={onChange}
                  onBlur={onBlur}
                  style={style}
                  inputStyle={{
                      color: '#555',
                      fontFamily: 'Play'
                  }}
                  underlineFocusStyle={styles.underlineFocusStyle}
                  underlineStyle={styles.underlineStyle}
                  inputStyle={styles.inputStyle}
                  hintStyle={styles.hintStyle}
                  value={value}
                />
              </MuiThemeProvider>
            </div>
        );
    } 
};

export default TextFieldTags;