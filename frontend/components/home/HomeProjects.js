import React from "react"
import {PropTypes} from "react"
import styles from './home.sass';
import ReactPaginate from 'react-paginate';
import {Row, Col} from 'react-bootstrap';
import GeneralInformation from './components/GeneralInformation';
import ListProjects from './components/ListProjects';
import Container from "./models/HomeContainer"
import CircularProgress from 'material-ui/CircularProgress';


export default class HomeProjects extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            model:PropTypes.instanceOf(Container)
        }
    }

    render() {
        const {model} = this.props;
        /*const {startGet,endGet,errorGet} = this.props;
        model.onStartSearch = model.onStartSearch || startGet;
        model.onEndSearch = model.onEndSearch || endGet;
        model.onErrorSearch = model.onErrorSearch || errorGet;*/
        const projects = model.projects;
        const {activePage,recordsPerPage,total} = model.pagination;
        const style = {display:"flex",justifyContent: "center"};//TODO:move to css
        return <div>
            <Row>
                <Col className={styles.bk}>
                    <div style={{display:"flex"}}>
                        <GeneralInformation
                            cnt={ total }/>
                        {model.isLoading?<CircularProgress size={0.6}/>:""}
                    </div>
                    <div style={style}>
                        <ReactPaginate forceSelected={activePage}
                                       initialSelected={activePage}
                                       previousLabel={"previous"}
                                       nextLabel={"next"}
                                       breakLabel={<span>...</span>}
                                       breakClassName={"break-me"}
                                       pageNum={Math.ceil(total/recordsPerPage)}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={5}
                                       clickCallback={model.setActivePage}
                                       containerClassName={"pagination"}
                                       subContainerClassName={"pages pagination"}
                                       activeClassName={"active"} />
                    </div>

                    <ListProjects
                        projects={projects}/>
                    <div style={style}>
                        <ReactPaginate forceSelected={activePage}
                                       initialSelected={activePage}
                                       previousLabel={"previous"}
                                       nextLabel={"next"}
                                       breakLabel={<span>...</span>}
                                       breakClassName={"break-me"}
                                       pageNum={Math.ceil(total/recordsPerPage)}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={5}
                                       clickCallback={model.setActivePage}
                                       containerClassName={"pagination"}
                                       subContainerClassName={"pages pagination"}
                                       activeClassName={"active"} />
                    </div>
                </Col>
            </Row>
        </div>
    }
}