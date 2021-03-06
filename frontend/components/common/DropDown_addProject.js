import React, { PropTypes } from 'react';
// import styles from './styles/dropdown.sass';

export default class DropDownNewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.data[0]
        };
    }
    componentWillReceiveProps(nextProps) {
        const value = nextProps.value || nextProps.data[0];
        this.setState({selected: value});
    }
    render() {
        let labelHtml = <label htmlFor={this.props.id}>{this.state.selected.name}</label>;
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
                <select id={this.props.id} value={this.state.selected.value} onChange={(e) => {
                    const option = this.props.data.filter(item => {
                        return item.value === e.target.value;
                    })[0];

                    this.props.onChange(e,option);

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
    value: PropTypes.object,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func
};
