import React, {Component, PropTypes} from 'react';
import styles from './styles.sass';

class TechnologiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfTechnologies: this.props.listOfTechnologies,
            listOfTechnologiesChecked: this.props.listOfTechnologiesChecked,
            allChecked: this.props.allChecked
        };
        this.addTechnologiesToDeleteData = this.addTechnologiesToDeleteData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            listOfTechnologies: nextProps.listOfTechnologies
        });
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //
    //
    //     if (nextProps.listOfTechnologies.length !== this.props.listOfTechnologies.length || nextProps.allChecked !== this.props.allChecked) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    addTechnologiesToDeleteData(e) {
        let id = e.target.id;
        let action;
        if (e.target.checked) {
            action = 'add';
            e.target.checked = false;
        } else {
            action = 'remove';
            e.target.checked = 'checked';
        }
        this.props.controlCheckeditems(id,action);
    }

    render() {

        let {listOfTechnologies} = this.state;
        return (
            (listOfTechnologies.length > 0) ? <div className={styles.techList + " col-md-12"}>
                { listOfTechnologies.map((elem, index, array) => {
                    return <label className={styles.checkbox__wrapper} key={elem._id} htmlFor={elem._id}>
                        <input onChange={this.addTechnologiesToDeleteData}  checked={elem.checked} type="checkbox"
                               id={elem._id} value={elem.techName}/> {elem.techName}
                        <i className={(elem.checked === 'checked')?'fa-check-square fa':'fa-square-o fa'} aria-hidden="true"></i>
                    </label>
                })}
            </div> : null
        )
    };
}
export default TechnologiesList;
