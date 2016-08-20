import React, { Component } from 'react';
import Comment from './Comment';

import styles from './questions.sass';

class Questions extends Component {
    constructor(props){
        super(props);

        this.state = {
            show_q: false,
            shoq_a: []
        }
    }



    render() {

        let q = this.props.questions || [];
        console.log(this.state);



        return(
            <div id={this.props.id} >
                <div className={styles['section-title']} >
                    Questions & Answers
                    <button>Hide questions</button>
                </div>
                <ul className={styles['outer-list']} >
                    {q.map(function(q_item, index){
                        return(
                            <li key={index} >
                                <Comment type="q" expr={q_item.question} />
                                <ul className={['inner-list']} >
                                    {q_item.answers.map(function(a_item, index){
                                        return(
                                            <li key={index} >
                                                <Comment type="a" expr={a_item} />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
}

export default Questions;