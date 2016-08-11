import React, { Component } from 'react';
import { Col, Pagination } from 'react-bootstrap';
import styles from './PaginationHome.sass';

export default class PaginationHome extends Component {

    static propTypes = {
        activePage: React.PropTypes.number.isRequired,
        pageSelect: React.PropTypes.func.isRequired
    };

    render() {

        const {activePage, pageSelect} = this.props;

        return (
            <Col xs={12} className={styles.navigation}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={2} //number of pages
                    maxButtons={3}
                    activePage={activePage}
                    onSelect={pageSelect} />
            </Col>
        )
    }
}