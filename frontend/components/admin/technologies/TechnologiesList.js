import React, {Component, PropTypes} from 'react';
import styles from  './styles.sass';
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
        this.props.controlCheckeditems(id, action);
    }

    render() {

        let {listOfTechnologies} = this.state;
        return (
            (listOfTechnologies.length > 0) ?
                <div className={styles['list_container']}>
                    { listOfTechnologies.map((elem, index, array) => {
                        return <div className={styles['list-item']} key={elem._id}>
                        <input className={styles['select-all-checkbox']} onChange={this.addTechnologiesToDeleteData}
                               checked={elem.checked} type="checkbox"
                               id={elem._id} value={elem.techName}/>
                        <label className={styles['select-all-label']} htmlFor={elem._id}>{elem.techName}</label>
                        <a href={'/admin/tech/'+elem._id}>Edit</a>
                            <div className={styles['hidden_block']}>
                                <div className={styles['img_wrapper']}>
                                <img src={elem.techAvatar}/>
                                    </div>
                                <div className={styles['description_wrapper']}>
                                {elem.techDescription}
                                </div>
                            </div>


                        </div>
                    })}
                </div> : null
        )
    };
}
export default TechnologiesList;
