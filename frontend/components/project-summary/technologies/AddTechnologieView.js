import React from "react"
import {PropTypes} from "react"
import BasicTechnologieView from "./BasicTechnologieView"
import EditTechnologieView from "./EditTechnologieView"
import techService from "./../../../services/TechnologieService"
import AddTechComponent from "./AddTechComponent"
import {Tab, Tabs} from "react-bootstrap"
var TabConstants = {
    LOCAL: 1,
    GLOBAL: 2
};
export default class AddTechnologieView extends React.Component {
    constructor() {
        super()
        this.updateFromServer();
        //TODO: this state should be in reducer
        this.state = {
            currentTab: TabConstants.LOCAL,
            globalTechs: [],
            globalEternalTechs: [],
            selectedTechs: [],
            newTech: {techName: "", techDescription: ""}
        }
    }

    updateFromServer() {
        var self = this;
        techService.getAllTechnologies()
            .then(res=>res.json())
            .then(techs=> {
                self.setState({
                    globalTechs: techs,
                    globalEternalTechs: techs,
                    selectedTechs: self.props.techs
                }, ()=> {
                    self.filterGlobal()
                })
            })
    }

    static get propTypes() {
        return {
            techs: PropTypes.array.isRequired,
            /**
             * @param {Array<tech>})
             */
            selectedTechsModified: PropTypes.func
        }
    }

    deleteTech(tech) {
        let newTechs = this.state.selectedTechs.filter(t=>t._id !== tech._id);
        this.setState({selectedTechs: newTechs}, ()=> {
            this.filterGlobal();
        })
        this.props.selectedTechsModified(newTechs)
    }

    addTechToGlobal(tech) {
        //TODO: should post new tech on server
        let newGlobalTechs = this.state.globalEternalTechs.concat(tech)
        this.setState({
            globalEternalTechs: newGlobalTechs,
            newTech: {techName: "", techDescription: ""}
        }, ()=> {
            this.filterGlobal()
        })
        this.props.addNewTech(tech)
    }

    addTech(tech) {
        this.addTechToGlobal(tech)
        this.addTechToSelected(tech)
    }

    addTechToSelected(tech) {
        let newTechs = this.state.selectedTechs.concat(tech);
        //update on server
        this.setState({
            selectedTechs: newTechs
        }, ()=> {
            this.filterGlobal();
        })
        this.props.selectedTechsModified(newTechs)
    }

    modifyTech(partOfTech) {
        let newTech = Object.assign({}, this.state.newTech, partOfTech);
        this.setState({newTech})
    }

    filterGlobal() {
        let {globalEternalTechs, selectedTechs} = this.state;
        let newGlobal = globalEternalTechs.filter(tech=> {
            return selectedTechs.indexOf(tech) == -1;
        })
        this.setState({globalTechs: newGlobal})
    }

    handleSelect(eventKey) {
        event.preventDefault();
        this.setState({currentTab: eventKey})
    }

    render() {
        let {globalTechs, selectedTechs, newTech} = this.state,
            globalTab =
                <div>
                    <h2>Global Techs</h2>
                    <BasicTechnologieView techs={globalTechs} selectTech={this.addTechToSelected.bind(this)}/>
                </div>,
            localTab =
                <div>
                    <h2>Your Techs</h2>
                    <AddTechComponent
                        newTech={newTech}
                        modifyTech={this.modifyTech.bind(this)}
                        addTech={this.addTech.bind(this)}
                    />
                    <EditTechnologieView techs={selectedTechs} deleteTech={this.deleteTech.bind(this)}/>
                </div>;
        return (
            <Tabs bsStyle="tabs" justified activeKey={Tab.LOCAL}
                  onSelect={this.handleSelect.bind(this)} animation={false}
                  id="controlled-tab-example">
                <Tab eventKey={TabConstants.LOCAL} title="Local">{localTab}</Tab>
                <Tab eventKey={TabConstants.GLOBAL} title="Global">{globalTab}</Tab>
            </Tabs>
        );
    }
}