import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {bsagrey, bsagreen} from 'material-ui/styles/colors';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const RadioButtonExampleSimple = () => (
  <div>
    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
      <RadioButton
        value="light"
        label="Simple"
        style={styles.radioButton}
        iconStyle={{
						     fill: bsagreen
						   }}
      />
      <RadioButton
        value="not_light"
        label="Selected by default"
        style={styles.radioButton}
        iconStyle={{
						     fill: bsagreen
						   }}
      />
      <RadioButton
        value="light2"
        label="Simple2"
        style={styles.radioButton}
        iconStyle={{
						     fill: bsagreen
						   }}
      />
    </RadioButtonGroup>
  </div>
);

export default RadioButtonExampleSimple;