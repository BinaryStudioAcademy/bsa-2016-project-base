import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroupItem, Label } from 'react-bootstrap';

import styles from './Project.sass'

export default class Project extends Component {

    static propTypes = {
        project: React.PropTypes.object.isRequired
    };
    
    render() {

        const { project } = this.props;

        return (
            <ListGroupItem className={styles['list-group-item']}>
                <h4>
                    <Link to={`/project-summary/1`} >{project.projectName}</Link>
                </h4>
                <div className={styles.labels} >
                    <Label>ranking</Label><Label className={styles['label-ranking']} >4.2/5.0</Label>
                    <Label>downloads</Label><Label className={styles['label-downloads']} >4,381</Label>
                    <Label>OS</Label><Label className={styles['label-os']} >Windows</Label>
                </div>

                {(project.technologies) ?
                    <div className={styles.labels}>
                        {project.technologies.map((tech) => {
                            return (
                                    <Label key={tech._id} className="tech">{tech.techName}</Label>
                            );
                        })}
                    </div> : null
                }
                {/*<div className={styles.labels} >
                    <Label>JavaScript</Label><Label className={styles['label-language']} >2015</Label>
                    <Label>Bootstrap</Label><Label className={styles['label-framework']} >3.8.4</Label>
                    <Label>ReactJS</Label><Label className={styles['label-library']} >4.12.7</Label>
                    <Label>Redux</Label><Label className={styles['label-library']} >5.1.8</Label>
                    <Label>MongoDB</Label><Label className={styles['label-database']} >11.6.2</Label>
                </div>*/}
                <div className={styles.description} >
                    {project.description[0].descrText}
                </div>
                {(project.timeEnd)?
                    <p>Project finished in: <span>{project.timeEnd.split('T')[0]}</span></p>:
                    <p>Progect in process</p>
                }

            </ListGroupItem>
        )
    }
}