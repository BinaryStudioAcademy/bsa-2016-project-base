import React from "react"
import {PropTypes} from "react"
import styles from "./styles.sass"
import ExudingText from "./ExudingTextComponent"
export default class TechnologieList extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            techs: PropTypes.array.isRequired,
            pattern: PropTypes.string,
            selectTech: PropTypes.func.isRequired
        }
    }

    getTechComponentChildren(tech) {
        let {pattern} = this.props;
        //img should be tech.image
        return [
            <div className={styles.flex_items}>
                <img src="http://javascriptismagic.github.io/aui/logos/react.png" alt={tech.techName} height="50px"/>
            </div>,
            <div className={styles.flex_items}>
                <ExudingText
                    text={tech.techName} pattern={pattern}/>
            </div>,
            <div className={styles.flex_items}>
                <ExudingText
                    text={tech.techDescription} pattern={pattern}/>
            </div>
        ];

    }

    techToTechComponent(tech) {
        var selectTech = this.props.selectTech;
        var onClick = function () {
            selectTech && selectTech(tech)
        };
        return (<div className={styles.elemetnOfTechnologyList} onClick={onClick}>
            {this.getTechComponentChildren(tech)}
        </div>)
    }

    render() {
        let components = this.props.techs.map(this.techToTechComponent.bind(this))
        return <section className={styles.sectionTechnology}>
            {components}</section>
    }
}