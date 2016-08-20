import React from "react"
import {PropTypes} from "react"
import styles from './home.sass';
import ReactPaginate from 'react-paginate';
import {Row, Col} from 'react-bootstrap';
import GeneralInformation from './components/GeneralInformation';
import ListProjects from './components/ListProjects';


export default class HomeProjects extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {}
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        const {receiveUpdatePagination} = this.props;
        receiveUpdatePagination(selected);
    };
    render() {
        const {projects, pagination} = this.props.store;
        const {activePage,perpage,total} = pagination;
        return <div>
            <Row>
                <Col className={styles.bk}>
                    <GeneralInformation
                        cnt={ total }/>
                    <ListProjects
                        projects={projects}/>
                    <ReactPaginate initialSelected={activePage}
                                   previousLabel={"previous"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="">...</a>}
                                   breakClassName={"break-me"}
                                   pageNum={Math.ceil(total/perpage)}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   clickCallback={this.handlePageClick.bind(this)}
                                   containerClassName={"pagination"}
                                   subContainerClassName={"pages pagination"}
                                   activeClassName={"active"} />
                </Col>
            </Row>
        </div>
    }
}
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/HomeActions';
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        store: state.HomeReducer
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeProjects);