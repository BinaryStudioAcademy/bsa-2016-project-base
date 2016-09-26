import React, { Component } from 'react';
import { Col, Pagination } from 'react-bootstrap';
import styles from './PaginationHome.sass';

export default class PaginationHome extends Component {

    static propTypes = {
        activePage: React.PropTypes.number.isRequired,
        sumPages: React.PropTypes.number.isRequired,
        pageSelect: React.PropTypes.func.isRequired
    };

    render() {

        const {activePage, pageSelect, sumPages} = this.props;

        return (
            (sumPages > 1)?
            <Col id='pagination-home' className={styles.navigation}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={sumPages}
                    maxButtons={3}
                    activePage={activePage}
                    onSelect={pageSelect} />
            </Col>: null
        )
    }
}