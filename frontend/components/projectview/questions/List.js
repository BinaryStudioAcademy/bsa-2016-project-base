import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Comment from './Comment';

import styles from './list.sass';
import styles_anime from './animation.sass';

class List extends Component {
    constructor(props) {
        super(props);
    }

    handleHideA(i) {
        this.props.handleHideA(i);
    }

    render() {

        let type = this.props.type;
        let collection = this.props.collection;
        let show_a = this.props.show_a;

        return(
            <ul className={type=='q' ? styles['outer-list'] : styles['inner-list']} >
                {collection.map(function(item, index){
                    return(
                        <li key={index} >
                            <Comment
                                type={type}
                                expr={type=='q' ? item.question : item}
                                handleHideA={type=='q' ? this.handleHideA.bind(this,index) : null}
                                show_a={type=='q' ? show_a[index] : null}
                            />
                            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                            {type=='q' && show_a[index] ? <List type="a" collection={item.answers} /> : null}
                            </ReactCSSTransitionGroup>
                        </li>
                    );
                },this)}
            </ul>
        )
    }
}

export default List;