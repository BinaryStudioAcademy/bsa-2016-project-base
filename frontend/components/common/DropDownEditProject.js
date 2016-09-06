import React, { Component,PropTypes } from 'react';
import styles from './styles/dropdown.sass';

export default class DropDownEditProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected:  this.props.data[this.props.selectedIndex]
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps ',nextProps.value );
        const value = nextProps.value || nextProps.data[0];
        this.setState({selected: value});
    }
    render() {
        console.log('this.state.selected.name ',this.state.selected);
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
        //let labelHtml = <label htmlFor={this.props.id}>options.name</label>;
        return (
            <div>
                {labelHtml}
                <select id={this.props.id} value={this.state.selected.value} onChange={(e) => {
                    /*this.setState({selected: this.props.data.filter(item => {
                        return item.value === e.target.value;
                    })[0]});*/
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

DropDownEditProject.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.object,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func
};