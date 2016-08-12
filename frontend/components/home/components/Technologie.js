import React, { Component } from 'react';

export default class Technologie extends Component {

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        filter: React.PropTypes.func.isRequired
    };

    render() {

        const { name, filter } = this.props;

        return (
            <span>
                <input
                    type="checkbox"
                    value={name}
                    id={name}
                    onChange={filter} />
                <label htmlFor={name}>
                    {name}
                </label>
            </span>
        )
    }
}