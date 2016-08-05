import React from "react"
import {PropTypes} from "react"
import styles from "./styles.sass"
export default class ExudingTextComponent extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            pattern: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        }
    }

    getText() {
        let {pattern, text} = this.props;
        if (!pattern) return text;
        let textArray = text.replace(new RegExp(`(${pattern})`, "gi"), " $1 ");
        let textArrayJsx = textArray.split(" ").map(partOfText=> {
            if (partOfText.toLowerCase() === pattern.toLowerCase())
                return <span className={styles.exudingText}>{partOfText}</span>;
            return <span>{partOfText}</span>
        });
        return textArrayJsx;
    }

    render() {
        return <span>{this.getText()}</span>
    }
}