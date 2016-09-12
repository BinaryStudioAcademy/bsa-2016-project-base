import React, { Component, PropTypes } from 'react';
import { Subheader, Divider } from 'material-ui';
import { List, ListItem, MakeSelectable} from 'material-ui/List';
import wrapState from './wrapState';

const styles = {
    listItem: {
        color: '#555',
        fontFamily: 'Lato',
        fontSize: '1.1rem',
        backgroundColor: '#fff' 
    },
    secondaryText: {
        color: '#555'
    },

}

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
                    secondaryText={<span style={styles.secondaryText}>{project.description.descrText}</span>}
                    style={styles.listItem}
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