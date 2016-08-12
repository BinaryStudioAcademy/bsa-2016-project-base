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

    render() {
        return (<div>
                <input id="my-file" type="file" name="my-file" style={{display: "none"}}  />
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
                    automatic_uploads: false,
                    file_browser_callback: function(field_name, url, type, win) {
                        debugger
                        win.document.getElementById(field_name).value = `url: ${url} type: ${type} win: ${win}`;
                    },
                    file_picker_callback: function(callback, value, meta) {
                        debugger
                        // Provide file and text for the link dialog
                        if (meta.filetype == 'file') {
                            callback('mypage.html', {text: 'My text'});
                        }

                        // Provide image and alt text for the image dialog
                         if (meta.filetype == 'image') {
                            var input = document.getElementById('my-file');
                            input.onchange = function () {
                                var file = input.files[0];
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    debugger;
                                    fileService.save({filename:file.name, data:e.target.result})
                                        .then(res=>res.json())
                                        .then(json=>{
                                            input.value = ""
                                            debugger
                                            callback(json.location, {
                                            alt: file.name});
                                        })
                                };
                                reader.readAsDataURL(file);
                            };
                            input.click();
                    }

                        // Provide alternative source and posted for the media dialog
                        if (meta.filetype == 'media') {
                            callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                        }
                    },
                    images_upload_credentials: true,
                }}
                    onChange={this.handleEditorChange.bind(this)}
                />
            </div>

        );
    }
}