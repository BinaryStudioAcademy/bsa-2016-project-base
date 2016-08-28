import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './comment.sass';

class Comment extends Component {
    constructor(props){
        super(props);
    }

    render() {

        let type = this.props.type;
        let expr = this.props.expr;

        let button = (type == 'q') ?
                <button onClick={this.props.handleHideA} >
                    {this.props.show_a ? 'Hide answers' : 'Show answers'}
                </button>
            : null;

        return(
            <div className={['comment-wrap']} type={type} >
                <div className={['comment-header']} >
                    <Link to={`/api/users/${expr.author}`} >John Doe</Link>&nbsp;
                    Junior Frontend Developer
                </div>
                {button}
                <div className={['comment-body']} >
                    <img src="http://placehold.it/60x60" />
                    <span>
                        {expr.text}
                    </span>
                </div>
            </div>
        )
    }
}

export default Comment;