import React from "react"
import {PropTypes} from "react"
export default class AddTechComponent extends React.Component {
    constructor() {
        super()
        this.nameInputHandler = this.nameInputHandler.bind(this)
        this.descriptionInputHandler = this.descriptionInputHandler.bind(this);
    }

    static get propTypes() {
        return {
            newTech: PropTypes.object.isRequired,
            addTech: PropTypes.func.isRequired,
            modifyTech: PropTypes.func.isRequired
        }
    }

    nameInputHandler(e) {
        this.props.modifyTech({techName: e.target.value})
    }

    descriptionInputHandler(e) {
        this.props.modifyTech({techDescription: e.target.value})
    }

    render() {
        let {techName, techDescription} = this.props.newTech;
        let {addTech, newTech} = this.props;
        return <div>
            <input placeholder="Name"
                   value={techName}
                   onChange={this.nameInputHandler}
            />
            <input placeholder="Description"
                   value={techDescription}
                   onChange={this.descriptionInputHandler}
            />
            <button
                onClick={addTech.bind(null,
                    newTech)}>Add
            </button>
        </div>
    }
}