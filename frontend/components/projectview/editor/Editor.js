import React from "react"
import {PropTypes} from "react"
import TinyMCE from "react-tinymce"
import fileService from "./../../../services/FileService"
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

    handleEditorChange(e) {
        console.log('Content was updated:', e.target.getContent());
        const {handleChange} = this.props;
        handleChange && handleChange(e.target.getContent())
    }


    replaceNodes(oldNode,newNode){
        oldNode.parentNode.insertBefore(newNode, oldNode);
        oldNode.parentNode.removeChild(oldNode);
    }
    /**
     *
     * @param callback({string}location,{string}filename)
     */
    selectImageByExplorerAndUpload(callback,fieldName, window){
        var self = this;
        var inputField = window.document.getElementById(fieldName);
        var inputFile = document.createElement("input");
        inputFile.setAttribute("type", "file");
        inputFile.onchange = function () {
            var file = inputFile.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var progressBarContainer = window.document.createElement("div");
                var progressBar = window.document.createElement("span");
                progressBarContainer.appendChild(progressBar);
                progressBarContainer.setAttribute("id", fieldName);
                progressBarContainer.setAttribute("class", inputField.getAttribute("class"));
                self.replaceNodes(inputField, progressBarContainer);
                var request = new XMLHttpRequest();
                request.open("POST", "http://localhost:3000/_image_upload_", true);
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                request.send(JSON.stringify({data:e.target.result}));
                request.upload.onprogress = event=>{
                    debugger
                    progressBar.innerHTML = (event.loaded + ' байт из ' + event.total )
                };

                request.onreadystatechange = function() {
                    debugger
                    if (request.readyState == XMLHttpRequest.DONE) {
                        self.replaceNodes(progressBarContainer, inputField)
                        var json = JSON.parse(request.responseText);
                        callback(json.location, file.name);
                    }
                }
                /*callback("uploading image...", "uploading image...");
                fileService.save({filename:file.name, data:e.target.result})
                    .then(res=>res.json())
                    .then(json=>{
                        debugger
                        callback(json.location, file.name);
                    })*/
            };
            //TODO: notify about uploading
            callback("reading image from disc...", "reading image from disc...");
            reader.readAsDataURL(file);
        };
        inputFile.click();
    }


    render() {
        const self = this;
        return (<div>
                <TinyMCE
                    content={this.props.initialContent || "<p>This is the initial content of the editor</p>"}
                    config={{
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
                    automatic_uploads: true,
                    file_browser_callback: function(field_name, url, type, win) {
                        if ("image" == type){
                            let field = win.document.getElementById(field_name);
                            self.selectImageByExplorerAndUpload(text=>{field.value = text}, field_name, win)
                        }
                        //win.document.getElementById(field_name).value = `url: ${url} type: ${type} win: ${win}`;
                    },
                    /*file_picker_callback: function(callback, value, meta) {
                        debugger
                        // Provide file and text for the link dialog
                        if (meta.filetype == 'file') {
                            callback('mypage.html', {text: 'My text'});
                        }
                        // Provide image and alt text for the image dialog
                        if (meta.filetype == 'image') {
                            self.selectImageByExplorerAndUpload((loc,name)=>{
                                callback(loc,{alt:name})
                            });
                        }
                        // Provide alternative source and posted for the media dialog
                        if (meta.filetype == 'media') {
                            callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                        }
                    },*/
                    /*images_upload_url: '/_image_upload',
                    images_upload_credentials: true*/
                }}
                    onChange={this.handleEditorChange.bind(this)}
                />
            </div>
        );
    }
}