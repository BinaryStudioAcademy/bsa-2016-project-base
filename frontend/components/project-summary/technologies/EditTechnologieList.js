import React from "react"
import {PropTypes} from "react"
import TechnologieList from "./TechnologieList"
import styles from "./styles.sass"
export default class EditTechnologieList extends TechnologieList {
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

    deleteClickHandler(tech, e) {
        e.preventDefault()
        this.props.deleteTech(tech)
    }

    getTechComponentChildren(tech) {

        return super.getTechComponentChildren(tech).concat(
            [<div className={styles.flex_items}>
                <a href="#" onClick={this.deleteClickHandler.bind(this, tech)}>
                    <img height="50px"
                         src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Recycle_Bin_Full.png"
                         className={styles["material-icons"] + " " + styles.delRed}/>


                </a>
            </div>])
    }
}