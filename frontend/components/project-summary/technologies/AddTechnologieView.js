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
        //TODO: this state should be in reducer
        this.state = {
            currentTab: TabConstants.LOCAL,
            globalTechs: [],
            globalEternalTechs: [],
            selectedTechs: [],
            newTech: {techName: "", techDescription: ""}
        }
    }

    static get propTypes() {
        return {
            techs: PropTypes.array.isRequired,
            /**
             * @param {Array<tech>})techs
             */
            selectedTechsModified: PropTypes.func,
            /**
             * @param {Error}error
             */
            failedLoadGlobalTechs: PropTypes.func,
            startLoadGlobalTechs: PropTypes.func,
            successfullyLoadGlobalTechs: PropTypes.func,
            /**
             * @param {Error}error
             */
            failedAddNewTech: PropTypes.func,
            startAddNewTech: PropTypes.func,
            successfullyAddNewTech: PropTypes.func
        }
    }

    componentDidMount() {
        this.updateFromServer();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.techs) {
            this.setState({
                selectedTechs: nextProps.techs
            });
        }
    }
    updateFromServer() {
        var self = this;
        let {failedLoadGlobalTechs, startLoadGlobalTechs, successfullyLoadGlobalTechs} = this.props;
        startLoadGlobalTechs && startLoadGlobalTechs();
        techService.getAllTechnologies()
            .then(res=>res.json())
            .then(techs=> {
                self.setState({
                    globalTechs: techs,
                    globalEternalTechs: techs,
                    selectedTechs: self.props.techs
                }, ()=> {
                    self.filterGlobal();
                    successfullyLoadGlobalTechs && successfullyLoadGlobalTechs();
                })
            })
            .catch(err=> {
                failedLoadGlobalTechs && failedLoadGlobalTechs(err)
            })
    }



    deleteTech(tech) {
        let newTechs = this.state.selectedTechs.filter(t=>t._id !== tech._id);
        this.setState({selectedTechs: newTechs}, ()=> {
            this.filterGlobal();
        })
        this.props.selectedTechsModified(newTechs)
    }

    addTechToGlobal(tech) {
        let {failedAddNewTech, startAddNewTech, successfullyAddNewTech} = this.props;
        startAddNewTech && startAddNewTech();
        techService.addTechnologie(tech)
            .then(()=> {
                let newGlobalTechs = this.state.globalEternalTechs.concat(tech)
                this.setState({
                    globalEternalTechs: newGlobalTechs,
                    newTech: {techName: "", techDescription: ""}
                }, ()=> {
                    this.filterGlobal()
                    successfullyAddNewTech && successfullyAddNewTech()
                    this.addTechToSelected(tech)
                })
            })
            .catch(err=> {
                failedAddNewTech && failedAddNewTech(err)
            })

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
                    <BasicTechnologieView techs={globalTechs} selectTech={this.addTechToSelected.bind(this)}/>
                </div>,
            localTab =
                <div>
                    <AddTechComponent
                        newTech={newTech}
                        modifyTech={this.modifyTech.bind(this)}
                        addTech={this.addTechToGlobal.bind(this)}
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