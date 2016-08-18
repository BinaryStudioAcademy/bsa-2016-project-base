import React from "react"
import {PropTypes} from "react"
import ReactDom from "react-dom"
import documentService from "./../../../services/DocumentService"


export default class EstimationFileReceiverComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            authLink:""
        }
    }

    static get propTypes() {
        return {
            receiveFileLink:PropTypes.func.isRequired
        }
    }
    componentDidMount(){
        documentService.getAuthLink().then(json=>{
            const link = json.link;
            this.setState({authLink:link})
        })
    }
    doRequest(){
        if (!this.state.tokens){
            this.onAuth();
        }
        else {
            this.receiveFileLink();
        }
    }
    receiveFileLink(){
        var {receiveFileLink} = this.props;
        var allTokens = this.state.tokens;
        var tokens = JSON.stringify({access_token:allTokens.access_token})
        documentService.getTestDocument(tokens)
            .then(json=>{
                const link = json.link;
                receiveFileLink(link)
            })
    }
    inputChangeHandler(){
        var allTokens = JSON.parse(ReactDom.findDOMNode(this.refs.tokens).value);
        this.setState({tokens:allTokens}, function(){
            this.receiveFileLink();
        }.bind(this));
    }
    onAuth(e){
        e && e.preventDefault();
        var url = this.state.authLink;
        window.open(url, "", "width=600,height=600");
    }
    render() {
        return <div>
                <input type="hidden" id="tokens" ref="tokens"/><br/>
                <input type="hidden" id="auth-success" onClick={this.inputChangeHandler.bind(this)}/>
                <button ref="req" onClick={this.doRequest.bind(this)}>Get File</button>
        </div>
    }
}