import React, { Component } from 'react';

export default class Technologie extends Component {

    render() {

        const { name, filter } = this.props;

        return (
            <span>
                <input
                    type="checkbox"
                    value={name}
                    id={name}
                    defaultChecked
                    onChange={filter} />
                <label htmlFor={name}>{name}</label>
            </span>
        )
    }
}