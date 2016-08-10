import React, {Component, PropTypes} from 'react';
import {Grid, FormControl, Row, Col, Button} from 'react-bootstrap';
import styles from  '../features/styles/Features.sass';
import techstyles from  './styles.sass';
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
                <Grid className={styles['list-container'] + ' ' + techstyles['list-container']}>
                    { listOfTechnologies.map((elem, index, array) => {
                        return <div className={techstyles['list-item']} key={elem._id}>
                        <input className={styles['select-all-checkbox']} onChange={this.addTechnologiesToDeleteData}
                               checked={elem.checked} type="checkbox"
                               id={elem._id} value={elem.techName}/>
                        <label className={styles['select-all-label']} htmlFor={elem._id}>{elem.techName}</label>

                            <div className={techstyles['hidden_block']}>
                                <div className={techstyles['img_wrapper']}>
                                <img src={elem.techAvatar}/>
                                    </div>
                                <div className={techstyles['description_wrapper']}>
                                {elem.techDescription}
                                </div>
                            </div>


                        </div>
                    })}
                </Grid> : null
        )
    };
}
export default TechnologiesList;
