import React, { Component } from 'react';
import Project from './Project';

import styles from './ListProjects.sass';

export default class ListProjects extends Component {

    static propTypes = {
        projects: React.PropTypes.array.isRequired
    };

    ranking(rating) {
        if(rating.rateDistribution) {
            var pointsAmount = rating.rateDistribution.reduce(function (prev, curr, i) {
                return prev + curr * (i + 1);
            }, 0);

            var gradesAmount = rating.rateDistribution.reduce(function (prev, curr) {
                return prev + curr;
            });
        }else{ return 0; }

        return gradesAmount > 0 ? Math.round(pointsAmount/gradesAmount) : 0;
    }

    render() {
        const { projects } = this.props;

        return (
                (projects.length > 0) ?
                <ul className={styles["project-list-home"]}>
                    {projects.map( (project, index) =>
                        <li key={index}>
                            <Project
                                id={project._id}
                                data-id={project._id}
                                project={project}
                                ranking={this.ranking(project.rating)}/>
                        </li>
                    )}
                </ul> : null
        )
    }
}
