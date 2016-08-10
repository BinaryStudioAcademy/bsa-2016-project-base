import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroupItem, Label } from 'react-bootstrap';

import styles from './Project.sass'

export default class Project extends Component {

    static propTypes = {
        project: React.PropTypes.object.isRequired
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
                    {/*<span><Label>downloads</Label><Label className={styles['label-downloads']} >4,381</Label></span>
                    <span><Label>OS</Label><Label className={styles['label-os']} >Windows</Label></span>*/}
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
                {/*<div className={styles.labels} >
                 <span><Label>JavaScript</Label><Label className={styles['label-language']} >2015</Label></span>
                 <span><Label>Bootstrap</Label><Label className={styles['label-framework']} >3.8.4</Label></span>
                 <span><Label>ReactJS</Label><Label className={styles['label-library']} >4.12.7</Label></span>
                 <span><Label>Redux</Label><Label className={styles['label-library']} >5.1.8</Label></span>
                 <span><Label>MongoDB</Label><Label className={styles['label-database']} >11.6.2</Label></span>
                </div>*/}
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