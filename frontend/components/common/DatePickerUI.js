import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * `DatePicker` can be implemented as a controlled input,
 * where `value` is handled by state in the parent component.
 */
export default class DatePickerControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <DatePicker
          hintText="Controlled Date Input"
          value={this.state.controlledDate}
          onChange={this.handleChange}
        />
      </MuiThemeProvider>
    );
  }
}