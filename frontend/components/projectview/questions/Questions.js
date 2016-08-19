import React, { Component } from 'react';
import Comment from './Comment';

import styles from './questions.sass';

class Questions extends Component {
    constructor(props){
        super(props);

        /*let arr = [];
        for (let i=0; i<props.questions.length; i++){
            arr[i] = false;
        }

        this.state = {
            showQ: false,
            showA: props.questions.map((q) => {return false;})
        }
        console.log(this.props)*/
    }



    render() {

        let q = this.props.questions;
        console.log(this.state);

        return(
            <div id={this.props.id} >
                <div className={styles['section-title']} >
                    Questions & Answers
                    <button>Hide questions</button>
                </div>
                <ul className={styles['outer-list']} >
                    {q.map(function(q_item){
                        return(
                            <li>
                                <Comment type="q" expr={q_item.question} />
                                <ul className={['inner-list']} >
                                    {q_item.answers.map(function(a_item){
                                        return(
                                            <li>
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