import React,{ PropTypes } from "react";
import ReactDOM from "react-dom";
import TinyMCE from "react-tinymce";
import uploadService from '../../../services/UploadService';

export default class MyEditor extends React.Component {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            /**
             * @param newText{string}
             */
            handleChange: PropTypes.func,
            initialContent: PropTypes.string
        }
    }
    shouldComponentUpdate(nextProps, nextState){

        return false;
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.initialContent === '') {
            tinyMCE.activeEditor.setContent('');
        }
    }
    handleEditorChange(e) {
        const {handleChange} = this.props;
        handleChange && handleChange(e.target.getContent())
    }


    replaceNodes(oldNode, newNode) {
        oldNode.parentNode.insertBefore(newNode, oldNode);
        oldNode.parentNode.removeChild(oldNode);
    }

    /**
     *
     * @param callback({string}location,{string}filename)
     */
    selectImageByExplorerAndUpload(callback, fieldName, window) {
        var self = this;
        var inputField = window.document.getElementById(fieldName);
        var inputFile = document.createElement("input");
        inputFile.setAttribute("type", "file");
        inputFile.setAttribute("accept", ".png,.jpg,.gif");
        inputFile.onchange = function () {
            var file = inputFile.files[0];

             return uploadService.upload(file)
            .then(response => {
                if (response.status != 201) {
                    throw Error(response.statusText);
                } 
                return response.json();
            })
            .then( json =>  {
                callback(json.path || json.error.message);
               
            })
            .catch( error => {
                callback("error while uploading file")
            });





            /*var progressBar = window.document.createElement("progress");
            progressBar.setAttribute("style", "width:300px;height:50px");
            progressBar.setAttribute("id", fieldName);
            self.replaceNodes(inputField, progressBar);
            var request = new XMLHttpRequest();


            request.onreadystatechange = function () {
                if (request.readyState == XMLHttpRequest.DONE) {
                    try{
                        var json = JSON.parse(request.responseText);
                        self.replaceNodes(progressBar, inputField);
                        callback(json.location || json.error.message);
                    }catch (e){
                        callback("error while uploading file")
                    }
                }
            };
            request.upload.onprogress = event=> {
                if (!window.document.getElementById(fieldName)){
                    request.abort();
                }
                progressBar.setAttribute("value", event.loaded);
                progressBar.setAttribute("max", event.total)
            };
            request.open("POST", "http://localhost:3001/", true);
            request.send(file);*/

        };
        inputFile.click();
    }
    
    render() {
        const self = this;
        const {className,initialContent} = this.props
        console.log('EDITOR Rerender',this.props.initialContent);
        return (<div className={className}>
                <TinyMCE
                    content={this.props.initialContent}
                    config={{
                    //relative_urls: 'false',
                    //remove_script_host : 'false',
                    //document_base_url : ORIGIN,
                    //images_upload_base_path: ORIGIN,
                    editor_selector: 'my_editor_id', 
                    height:300,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table contextmenu paste"
                    ],
                    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify " +
                        "| bullist numlist outdent indent | link image",
                    file_browser_callback_types: 'file image media',
                    file_picker_types: 'file image media',
                    file_browser_callback: function(field_name, url, type, win) {
                        if ("image" == type){
                            let field = win.document.getElementById(field_name);
                            self.selectImageByExplorerAndUpload(text=>{field.value = text}, field_name, win)
                        }
                    }/*,
                    setup: function(editor) {
                        editor.on('click', function(e) {
                          console.log('Editor was clicked');
                        });
                        editor.on('change', function(e) {
                          console.log('Editor was change');
                         
                        });
                    }*/

                }}
                    onChange={this.handleEditorChange.bind(this)}

                />
            </div>
        );
    }
}