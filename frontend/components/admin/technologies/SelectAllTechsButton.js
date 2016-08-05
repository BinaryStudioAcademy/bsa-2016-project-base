import React from "react"
import {PropTypes} from "react"
export default class SelectAllTechsButton extends React.Component {
    constructor() {
        super()
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        return this.props.areAllSelected ?
            this.props.unselectAll() : this.props.selectAll();
    }

    static get propTypes() {
        return {
            selectAll: PropTypes.func.isRequired,
            unselectAll: PropTypes.func.isRequired,
            areAllSelected: PropTypes.bool.isRequired
        }
    }

    getText() {
        return this.props.areAllSelected ?
            "Unselect All" : "Select All";
    }

    render() {
        return <button onClick={this.onClickHandler}>{this.getText()}</button>
    }
}