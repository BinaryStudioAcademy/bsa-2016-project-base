import React from "react"
import {PropTypes} from "react"
import Receiver from "./EstimationFileReceiverComponent"
export default class EstimationFileReceiverComponentWithLinkField extends React.Component {
    constructor() {
        super()
        this.state = {link:""}
    }

    static get propTypes() {
        return {}
    }

    receiveLinkHandler(link){
        this.setState({link})
    }
    render() {
        var {link} = this.state;
        var shouldShowLink = !!link;
        var shouldShowGetComponent = !link;
        return <div>
            {shouldShowLink?<a style={{color:"black"}} target="_blank" href={link}>Link to Estimation</a>:""}
            {shouldShowGetComponent?<Receiver receiveFileLink={this.receiveLinkHandler.bind(this)}/>:""}
        </div>
    }
}