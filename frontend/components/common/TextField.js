import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import {bsagrey, bsagreen, bsared, bsablue} from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: bsagrey,
  },
  underlineStyle: {
    borderColor: bsagrey,
  },
  floatingLabelStyle: {
    color: bsared,
  },
  floatingLabelFocusStyle: {
    color: bsablue,
  },
};


const TextFieldSample = ({hintText, defaultValue, onChange, style, inputStyle}) => {
    return (
        <div>
          <TextField
            hintText={hintText}
            defaultValue={defaultValue}            
            onChange={onChange}
            inputStyle={inputStyle}
            underlineFocusStyle={styles.underlineStyle}
          />
        </div>
    );
};

TextField.propTypes = {
    hintText: PropTypes.string,
    defaultValue: PropTypes.string
};

export default TextFieldSample;