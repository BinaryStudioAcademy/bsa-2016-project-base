import React, { PropTypes } from 'react';
import styles from './styles/dropdown.sass';

export default class DropDownNewProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.label
        };
    }

    render() {
        let labelHtml = <label htmlFor={this.props.id}>{this.state.selected}</label>;
        const options = this.props.data.map( option => {
            return (
                <option 
                    value={option.value} 
                    key={'option_'+option.value}>
                    {option.name}
                </option>
            );
        });
        return (
            <div>
                {labelHtml}
                <select id={this.props.id} onChange={(e) => {
                    this.setState({selected: e.target.value});
                    this.props.onChange(e);
                }}>
                    {options}
                </select>
            </div>
        );
    }
}

DropDownNewProject.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func
};