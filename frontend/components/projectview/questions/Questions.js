import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import List from './List';

import styles from './questions.sass';
import styles_anime from './animation.sass';

class Questions extends Component {
    constructor(props){
        super(props);

        this.state = {
            show_q: true,
            show_a: []
        }

        this.handleHideQ = this.handleHideQ.bind(this);
        this.handleHideA = this.handleHideA.bind(this);
    }

    get qIsShown() {
        return this.state.show_q;
    }

    handleHideQ() {
        this.setState({
            show_q: !this.state.show_q,
            show_a: []
        });
    }

    handleHideA(i) {
        let my_show_a = this.state.show_a;
        my_show_a[i] = !my_show_a[i];
        this.setState({ show_a: my_show_a });
    }

    render() {

        let q = this.props.questions || [];

        return(
            <div id={this.props.id} >
                <div className={styles['section-title']} >
                    Questions & Answers
                    <button onClick={this.handleHideQ} >
                        {this.qIsShown ? 'Hide questions' : 'Show questions'}
                    </button>
                </div>
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {this.qIsShown ? <List type="q" collection={q} handleHideA={this.handleHideA} show_a={this.state.show_a} /> : null}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default Questions;