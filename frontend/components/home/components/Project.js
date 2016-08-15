import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroupItem, Label } from 'react-bootstrap';

import styles from './Project.sass'
import {FaCheckCircleO, FaCogs} from 'react-icons/lib/fa';
export default class Project extends Component {

    static propTypes = {
        project: React.PropTypes.object.isRequired,
        ranking: React.PropTypes.string.isRequired
    };
    
    render() {
        const { project, ranking } = this.props;

        return (
            <ListGroupItem id='home-project' className={styles['list-group-item']}>
                <Link to={`/project-view/${project._id}`}>
                <h4>
                    {project.projectName}
                </h4>
                {
                    (project.isCompleted) ?
                        <div className={styles['stage-icon']}>
                            <FaCheckCircleO size={80} color="#2ECC71" />
                            <p>PROJECT COMPLETED</p>
                        </div>:
                        <div className={styles['stage-icon']}>
                            <FaCogs size={80} color="#FC5A5A"/>
                            <p>PROJECT UNDER DEVELOPMENT</p>
                        </div>
                }

                <div className={styles['labels-container']}>
                <div className={styles.labels} >
                    <span className={styles['rank-label']}>ranking</span>
                    <span className={styles['label-rank-number']} >{ranking}/5.0</span>
                </div>

                {(project.technologies) ?
                    <div className={styles.labels}>
                        {project.technologies.map((tech) => {
                            return (
                                <span key={tech._id} className={styles['tech-label']}>
                                    <span className={styles['tech-name']}>{tech.techName}</span>
                                    <span className={styles['label-version']} >{tech.techVersion || "1.0"}</span>
                                </span>
                            );
                        })}
                    </div> : null
                }
                </div>
                <div className={styles.description} >
                    {project.description[0].descrText}
                </div>
                {(project.timeEnd)?
                    <div className={styles['update-date']} >Project finished in: {project.timeEnd.split('T')[0]}</div>:
                    <div>Progect in process</div>
                }
                </Link>
            </ListGroupItem>
            
        )
    }
}