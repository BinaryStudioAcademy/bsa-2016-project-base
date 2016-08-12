import React from "react"
import {PropTypes} from "react"
import TinyMCE from "react-tinymce"
export default class MyEditor extends React.Component {
    constructor(props) {
        super(props)
    }
    static get propTypes(){
        return{
            /**
             * @param newText{string}
             */
            handleChange:PropTypes.func.isRequired
        }
    }
    handleEditorChange(e) {
        console.log('Content was updated:', e.target.getContent());
        this.props.handleChange(e.target.getContent())
    }

    render() {
        return (
            <TinyMCE
                content="<p>This is the initial content of the editor</p>"
                config={{
                    height:300,
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                }}
                onChange={this.handleEditorChange.bind(this)}
            />
        );
    }
}