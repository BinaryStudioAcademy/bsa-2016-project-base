import React, { Component, PropTypes } from 'react';

class TabHead extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { id } = this.props;
        return (
            <span id={id}>
                {this.props.children}
            </span>
        )
    }
}

TabHead.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
    index: PropTypes.number
};



export default TabHead;
