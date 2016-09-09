import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroupItem, Label } from 'react-bootstrap';

import styles from './Project.sass'
import {FaCheckCircleO, FaCogs, FaTh} from 'react-icons/lib/fa';
export default class Project extends Component {

    static propTypes = {
        project: React.PropTypes.object.isRequired,
        ranking: React.PropTypes.number.isRequired
    };

    createLis() {
        let lis = [];
       
        for (let i = 0; i < 5; i++) {
            console.log(this.props.ranking - 1);
            if (i <= this.props.ranking - 1) {
                lis.push(<li className={styles.ranked}></li>);
            }
            else {
                lis.push(<li className={styles.unranked}></li>); 
            }
        }
        return lis;
    }
    render() {

        const { project, ranking, id} = this.props;
        let lis = this.createLis();
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
                    <div className={styles['description-t']}>
                        {project.description.descrText} 
                    </div>
                    <div className={styles['ranking-row']}>
                        <div className={styles.rating} >
                            <span className={styles.name}>Ranking:</span>
                            <ul className={styles["ranking-list"]}>
                              {lis}
                            </ul>
                            
                            {/*<span className={styles['number']} >{ranking}/5.0</span>*/}
                        </div>

                        {(project.technologies) ?
                            <div className={styles.technoligies}>
                            <div>
                          
                                    <FaTh size={12}/>
                                 </div>   
                       
                                <div className={styles.name}>{project.technologies.length}</div>
                                <ul className={styles["tech-list"]}>
                                    {project.technologies.map((tech, index) => {
                                        return (
                                            <li key={index} className={styles['tech-label']}>
                                                <span className={styles['tech-name']}>{tech.techName}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div> : null
                        }
                    </div>
                </Link>
            </li>

        )
    }
}
