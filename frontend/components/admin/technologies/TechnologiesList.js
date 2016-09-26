import React, {Component, PropTypes} from 'react';
import styles from  './styles.sass';
import {Link} from 'react-router'
import CheckBox from './CheckBoxTech-ui.js';
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

    addTechnologiesToDeleteData(idEl, checked) {
        let id = idEl;
        let action;
        if (checked) {
            action = 'add';
        } else {
            action = 'remove';
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
                            <CheckBox onChange={this.addTechnologiesToDeleteData}
                                      checked={elem.checked} type="checkbox"
                                      id={elem._id} value={elem.techName}
                                      label={elem.techName}/>

                            <Link to={'/admin/tech/' + elem._id} className="editLabel">Edit</Link>
                            <div className={styles['hidden_block']}>
                                {(elem.techAvatar) ?
                                    <div className={styles['img_wrapper']}>
                                        <img src={elem.techAvatar}/>
                                    </div>
                                    : '' }
                                {(elem.techDescription.length > 0) ?
                                    <div className={styles['description_wrapper']}>
                                        {elem.techDescription}
                                    </div>
                                    : ''}
                            </div>


                        </div>
                    })}
                </div> : null
        )
    };
}
export default TechnologiesList;