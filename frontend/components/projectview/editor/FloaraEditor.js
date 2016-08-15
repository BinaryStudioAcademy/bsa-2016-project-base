import React from "react"
import {PropTypes} from "react"
export default class FloaraEditor extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            initialContent:PropTypes.string.isRequired,
            handleChange:PropTypes.func.isRequired
        }
    }
    componentDidMount(){
        const {initialContent} = this.props;
        const self = this;
        $(function() {
            $('#edit').froalaEditor({
            })
            self.setHtml(initialContent)
            self.initOnChange();
        });
    }
    getHtml(){
        return $('#edit').froalaEditor('html.get');
    }
    setHtml(html){
        $("#edit").froalaEditor('html.set', html)
    }
    initOnChange(){
        var self = this;
        const {handleChange} = this.props;
        $('#edit').on('froalaEditor.input', function (e, editor, inputEvent) {
            handleChange && handleChange(self.getHtml())
        });
    }
    render() {
        return (<div>
                <form>
                    <textarea id="edit" name="content"></textarea>
                </form>
        </div>
    )
    }
    }