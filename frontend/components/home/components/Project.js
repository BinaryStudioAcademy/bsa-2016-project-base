import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroupItem, Label } from 'react-bootstrap';

import styles from './Project.sass'

export default class Project extends Component {

    static propTypes = {
        project: React.PropTypes.object.isRequired,
        ranking: React.PropTypes.string.isRequired
    };
    
    render() {
        const { project, ranking } = this.props;

        return (
            <ListGroupItem className={styles['list-group-item']}>
                <h4>
                    <Link to={`/project-summary/1`} >{project.projectName}</Link>
                </h4>
                <div className={styles.labels} >
                    <span><Label>ranking</Label><Label className={styles['label-ranking']} >{ranking}/5.0</Label></span>
                </div>

                {(project.technologies) ?
                    <div className={styles.labels}>
                        {project.technologies.map((tech) => {
                            return (
                                <span key={tech._id}>
                                    <Label className="tech">{tech.techName}</Label>
                                    <Label className={styles['label-library']} >{tech.techVersion || "1.0"}</Label>
                                </span>
                            );
                        })}
                    </div> : null
                }

                <div className={styles.description} >
                    {project.description[0].descrText}
                </div>
                {(project.timeEnd)?
                    <div className={styles['update-date']} >Project finished in: {project.timeEnd.split('T')[0]}</div>:
                    <div>Progect in process</div>
                }

            </ListGroupItem>
        )
    }
}