import React from "react"
import {PropTypes} from "react"
import styles from "./styles.sass"
import List from "./TechnologieList"
export default class BasicTechnologieView extends React.Component {
    constructor() {
        super()
        this.state = {pattern: ""};
    }


    static get propTypes() {
        return {
            techs: PropTypes.array.isRequired,
            selectTech: PropTypes.func
        }
    }

    searchInputChangeHandler(e) {
        this.setState({pattern: e.target.value})
    }

    getHeaderComponentChildren() {
        return [
            <input type="text"
                   className="form-control"
                   placeholder="Search for..."
                   onChange={this.searchInputChangeHandler.bind(this)}/>
        ]
    }

    getHeaderComponent() {
        return <div class={[styles.technologySearch, "row"]}>
            <div class="col-md-6">
                <div class="input-group">
                    {this.getHeaderComponentChildren()}
                </div>
            </div>
        </div>

    }

    filterTechs(tech) {
        let pattern = this.state.pattern
        if (!pattern) return true;
        return tech.techName && (tech.techName.toLowerCase().indexOf(pattern) > -1) ||
            tech.techDescription && (tech.techDescription.toLowerCase().indexOf(pattern) > -1)

    }

    getTechList() {
        let {techs, selectTech} = this.props,
            {pattern} = this.state;
        return <List techs={techs.filter(this.filterTechs.bind(this))}
                     pattern={pattern}
                     selectTech={selectTech}/>
    }

    render() {
        let headerComponent = this.getHeaderComponent(),
            techList = this.getTechList();
        return (
            <div>
                {headerComponent}
                {techList}
            </div>
        )
    }
}


