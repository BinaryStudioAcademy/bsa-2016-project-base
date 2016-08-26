import React, { Component, PropTypes } from 'react';

export default function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            selectedProject: PropTypes.string
        };

        render() {
            const { selectedProject, handleRequestChange } = this.props;
            return (
                <ComposedComponent
                    value={selectedProject}
                    onChange={handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}