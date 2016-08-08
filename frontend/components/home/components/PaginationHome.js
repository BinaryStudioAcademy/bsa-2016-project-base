import React, { Component } from 'react';
import { Col, Pagination } from 'react-bootstrap';
import styles from './PaginationHome.sass';

export default class PaginationHome extends Component {

    render() {

        return (
            <Col xs={12} className={styles.navigation}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={20}
                    maxButtons={5}
                    activePage={1}
                    onSelect={this.handleSelect}/>
            </Col>
        )
    }
}