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
  },
  inputStyle: { 
    cursor: 'pointer',
    color: '#627484',
    fontfamily: 'Lato, sans-serif',
    fontSize: '0.8rem',
    paddingLeft: '3.2rem'
  },
}
export default class DatePickerControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
  }
  shouldComponentUpdate(nextProps, nextState){
      return nextProps.value !== this.props.value;
  }
  componentWillReceivProps(nextProps){
      this.setState({
        controlledDate: nextProps.value
      })
  }
  handleChange(event, date){
    this.setState({
      controlledDate: date,
    });
  };

  render() {
    console.log('this.props.value ',this.props.value)
    return (

      <div>
      <div className='calendar-icon'>
        <FaCalendar />
      </div>
      <MuiThemeProvider>
        <DatePicker
          hintText={this.props.hint}
          value={this.props.value}
          onChange={(e, date) => { this.handleChange(e, date); this.props.onChange(e, date)}}
          textFieldStyle={styles.textFieldStyle}
          hintStyle={styles.hintStyle}
          // underLineStyle={styles.underlineStyle}
          underlineStyle={styles.underlineStyle}
          style={this.props.style}
          inputStyle={styles.inputStyle}
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