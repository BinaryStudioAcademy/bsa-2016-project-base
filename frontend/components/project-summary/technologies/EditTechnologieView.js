import React from "react"
import {PropTypes} from "react"
import BasicTechnologieView from "./BasicTechnologieView"
import List from "./EditTechnologieList"
export default class EditTechnologieView extends BasicTechnologieView {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            /**
             * @param {tech} tech
             */
            deleteTech: PropTypes.func.isRequired
        }
    }

    getTechList() {
        let {techs, deleteTech} = this.props,
            {pattern} = this.state;
        return <List techs={techs.filter(this.filterTechs.bind(this))}
                     pattern={pattern}
                     deleteTech={deleteTech}
        />
    }
}

