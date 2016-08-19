import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './comment.sass';

class CommentStatic extends Component {
    constructor(props){
        super(props);
    }

    render() {

        let type = this.props.type;

        let button = (type == 'q') ? <button>Hide answers</button> : null;

        return(
            <div className={['comment-wrap']} type={type} >
                <span className={['comment-header']} >
                    <Link to="#">John Doe</Link>&nbsp;
                    Junior Frontend Developer
                </span>
                {button}
                <button>Hide answers</button>
                <div className={['comment-body']} >
                    <img src="#" />
                    <span>
                        Vivendo albucius similique pro ea. Quo no stet graeci luptatum, ei pro quis detraxit. Alii purto dissentiet pri eu, quot verear his id, et fugit volumus platonem nec. No sea quis ceteros incorrupte. Invidunt tacimates per cu, ei autem voluptua definitionem qui.<br/>
                        Vix putent feugiat et, ei pri prima verterem pertinacia, at qui elitr convenire. Pri ponderum verterem tacimates ut, an usu putant consequat. An pro vitae lobortis. Eu pri nisl iudico docendi. Cum ei minim congue dissentiet, in vim facilis postulant, eu duo repudiare gloriatur. Qui magna vidisse repudiandae te.
                    </span>
                </div>
            </div>
        )
    }
}

export default CommentStatic;