import React, { Component } from 'react';
import Comment from './CommentStatic';

import styles from './questions.sass';

class QuestionsStatic extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div id={this.props.id} >
                <div className={styles['section-title']} >
                    Questions & Answers
                    <button>Hide questions</button>
                </div>
                <ul className={styles['outer-list']} >
                    <li>{/* 1st Q */}
                        <Comment type="q" />
                        <ul className={['inner-list']} >
                            <li>{/* 1st A on 1st Q */}
                                <Comment type="a" />
                            </li>
                            <li>{/* 2nd A on 1st Q */}
                                <Comment type="a" />
                            </li>
                        </ul>
                    </li>
                    <li>{/* 2nd Q */}
                        <Comment type="q" />
                        <ul className={['inner-list']} >
                            <li>{/* 1st A on 2nd Q */}
                                <Comment type="a" />
                            </li>
                            <li>{/* 2nd A on 2nd Q */}
                                <Comment type="a" />
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default QuestionsStatic;