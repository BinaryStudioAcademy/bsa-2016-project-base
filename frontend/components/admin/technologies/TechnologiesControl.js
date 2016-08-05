import React, {Component, PropTypes} from 'react';

class TechnologiesTab extends Component {
    constructor(props) {
        super(props);
        this.setAllChecked = this.setAllChecked.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
    }

    sendDeleteRequest(){
        this.props.deleteChecked();
    }

    setAllChecked(e){
        let action = e.target.checked ? 'add' : 'delete';
        this.props.setAllChecked(action);
    }

    render() {
        return (
            <div>
                <label htmlFor="delete_all">
                    <input onChange={this.setAllChecked} id="delete_all" type="checkbox"/>Check all
                </label>
                <button onClick={this.sendDeleteRequest} className="btn btn-warning">Delete all checked</button>
            </div>
        )
    }
}
;


export default TechnologiesTab;
