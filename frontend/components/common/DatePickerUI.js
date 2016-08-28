import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FaCalendar from 'react-icons/lib/fa/calendar';

/**
 * `DatePicker` can be implemented as a controlled input,
 * where `value` is handled by state in the parent component.
 */
let styles = {
  textFieldStyle: {
    color: '#627484',
    fontfamily: 'Lato, sans-serif',
    width: '100%'
  },
   hintStyle: {
    fontFamily: 'Lato, sans-serif',
    margin: '0 auto',
    fontSize: "0.9rem",
    top: '50%',
    left: '60px',
    bottom: '0',
    color: '#627484',
    transform: 'translate(0, -50%)'
  },
  underlineStyle: {
      borderColor: '#D5D7DA',
      borderBottom: '0px solid #D5D7DA'
  }
}
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

      <div>
      <div className='calendar-icon'>
        <FaCalendar />
      </div>
      <MuiThemeProvider>
        <DatePicker
          hintText={this.props.hint}
          value={this.state.controlledDate}
          onChange={this.handleChange}
          textFieldStyle={styles.textFieldStyle}
          hintStyle={styles.hintStyle}
          // underLineStyle={styles.underlineStyle}
          underlineStyle={styles.underlineStyle}
          style={this.props.style}
        />
      </MuiThemeProvider>
      </div>
    );
  }
}
DatePickerControlled.propTypes = {
   hint: React.PropTypes.string.isRequired,
   style: React.PropTypes.object.isRequired
};