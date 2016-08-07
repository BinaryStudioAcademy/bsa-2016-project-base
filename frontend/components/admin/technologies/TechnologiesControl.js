import React, {Component, PropTypes} from 'react';
import styles from './styles.sass';
class TechnologiesTab extends Component {
    constructor(props) {
        super(props);
        this.setAllChecked = this.setAllChecked.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
        this.state ={
            checked: false,
            formState: this.props.formState
        }
    }

    sendDeleteRequest(){
        this.props.deleteChecked();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            formState: nextProps.formState
        });
    }

    setAllChecked(e){
        let action = e.target.checked ? 'add' : 'delete';
        this.setState(
            {
                checked: e.target.checked
            }
        );
        this.props.setAllChecked(action);
    }
    showAddForm(){
        this.props.formAddControlState();
    }

    render() {
        return (
            <div className="control-wrapper col-md-7">
                <div className="col-md-5">
                <label className={styles.checkbox__wrapper} htmlFor="delete_all">
                    <input onChange={this.setAllChecked} checked={this.state.checked} id="delete_all" type="checkbox"/>
                    {(this.state.checked === true)?'Uncheck all':'Check all'}
                    <i className={(this.state.checked === true)?'fa-check-square fa':'fa-square-o fa'} aria-hidden="true"></i>
                </label>
                    </div>
                <div className={styles.btn__wrapper+" col-md-7 "}>
                    <button onClick={this.showAddForm} className={"btn "+ styles['btn-orange']}>
                        {(this.state.formState ==='hidden')?'Add':'Hide Form'}</button>
                <button onClick={this.sendDeleteRequest} className={"btn "+ styles['btn-black']}>Delete all checked</button>
                    </div>
            </div>

        )
    }
}
;


export default TechnologiesTab;
