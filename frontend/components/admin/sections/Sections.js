import React, { Component, PropTypes } from 'react';

import InsertSection from './InsertSection';
import SectionsToolBar from './SectionsToolBar';
import SectionsList from './SectionsList';

import styles from './styles/Sections.sass';

class SectionsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listCheckedSections: [],
			flagChecked: false
		};
		this.changeCheckedSection = this.changeCheckedSection.bind(this);
		this.markedAllSections = this.markedAllSections.bind(this);
		this.removeChecked = this.removeChecked.bind(this);
		this.unMarkAll = this.unMarkAll.bind(this);
	}

	unMarkAll() {
		this.setState({
			flagChecked: false
		})
	}

	removeChecked() {
		this.setState({
			listCheckedSections: [],
			flagChecked: false
		})
	}

	changeCheckedSection(check, sectionId, sectionLength) {
		if(check) {

			this.state.listCheckedSections = [...this.state.listCheckedSections, sectionId]

		}
		else if(!check) {
			this.state.listCheckedSections = this.state.listCheckedSections.filter(function(el) {
				if(el == sectionId) return false
				else return true;
			})

		}
		this.state.listCheckedSections.length == sectionLength && sectionLength!=0 ? this.setState({flagChecked: true}) : this.setState({flagChecked: false});
	}

	markedAllSections(sections, flagChecked) {
		if(sections.length == 0) return;
		if (flagChecked) {
			this.setState({
				listCheckedSections: sections.map(function(section) {
					return section._id
				}),
				flagChecked: true
			})
		} else {
			this.setState({
				listCheckedSections: [],
				flagChecked: false
			})
		}

	}

	render() {
		return (
			<div id="Sections">
				<SectionsToolBar removeChecked={this.removeChecked} listCheckedSections={this.state.listCheckedSections} markedAllSections={this.markedAllSections}
								 flagChecked={this.state.flagChecked}  />
				<SectionsList changeCheckedSection={this.changeCheckedSection} listCheckedSections={this.state.listCheckedSections}
							  flagChecked={this.state.flagChecked} />
				<InsertSection unMarkAll={this.unMarkAll} />
			</div>
		)
	}
}

export default SectionsTab;