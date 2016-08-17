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
            <li id='home-project' className={styles['list-group-item']}>
                <Link to={`/project-view/${project._id}`}>
                <h4>
                    {project.projectName}
                </h4>
                <img src="http://placehold.it/140x100" />
                {
                    (project.isCompleted) ?
                        <div className={styles['stage-icon']}>
                            <FaCheckCircleO size={25} color="#2ECC71" />
                            <span>PROJECT COMPLETED</span>
                        </div>:
                        <div className={styles['stage-icon']}>
                            <FaCogs size={25} color="#FC5A5A"/>
                            <span>PROJECT UNDER DEVELOPMENT</span>
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
               
                </Link>
            </li>
            
        )
    }
}