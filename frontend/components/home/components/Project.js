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

        const { project, ranking, id} = this.props;
        console.log(project)
        return (
            <li key={id} className={styles['list-group-item']}>
                <Link to={`/project-view/${project._id}`}>
                    <div className={styles["list-project-header"]}>
                        <h4>
                            {project.projectName}
                        </h4>
                        {
                            (project.status === "Completed") ?
                                <div className={styles["status-completed"]}><div className={styles["status-completed-label"]}>Completed</div></div> :
                                <div className={styles["status-inprogress"]}><div className={styles["status-inprogress-label"]}>In Progress</div></div>
                        }
                        
                    </div>
                    <div className={styles.image}>
                <img src="http://placehold.it/140x100" />
                </div>
                <div className={styles['labels-container']}>
                <div className={styles.labels} >
                    <span className={styles['rank-label']}>ranking</span>
                    <span className={styles['label-rank-number']} >{ranking}/5.0</span>
                </div>

                {(project.technologies) ?
                    <div className={styles.labels}>
                        {project.technologies.map((tech, index) => {
                            return (
                                <span key={index} className={styles['tech-label']}>
                                    <span className={styles['tech-name']}>{tech.techName}</span>
                                    <span className={styles['label-version']} >{tech.techVersion || "1.0"}</span>
                                </span>
                            );
                        })}
                    </div> : null
                }
                </div>
                <div className={styles.description} >
                    {project.description.descrText}
                </div>
                {(project.timeEnd)?
                    <div className={styles['update-date']} >Project finished on: {project.timeEnd.split('T')[0]}</div>:
                    <div>Progect in process</div>
                }
                </Link>
            </li>

        )
    }
}
