import React, { Component, PropTypes } from 'react';
import { Subheader, Divider } from 'material-ui';
import { List, ListItem, MakeSelectable} from 'material-ui/List';
import wrapState from './wrapState';

let SelectableList = wrapState(MakeSelectable(List));
export default class ProjectsList extends Component {

    render() {
        const { projects, selectedProject, handleRequestChange } = this.props;

        if (!projects.length) return <Subheader>No fit projects</Subheader>;
        let listOfProjects = projects.map((project, key)=>{
            return (
                <ListItem
                    key={key}
                    value={project._id}
                    primaryText={project.projectName}
                    secondaryText={project.description.descrText}
                />);
        });

        return (
            <div>
                <SelectableList selectedProject={selectedProject} handleRequestChange={handleRequestChange}>
                    <Subheader>Please, select Project for creating Estimation Table</Subheader>
                    <Divider />
                    {listOfProjects}
                    <Divider />
                </SelectableList>
            </div>
        );
    }
}