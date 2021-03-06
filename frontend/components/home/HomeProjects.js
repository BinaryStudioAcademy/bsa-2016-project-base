import React from "react"
import {PropTypes} from "react"
import styles from './home.sass';
import RaisedButton from 'material-ui/RaisedButton';
import {Row, Col} from 'react-bootstrap';
import GeneralInformation from './components/GeneralInformation';
import ListProjects from './components/ListProjects';
import Container from "./models/HomeContainer"
import CircularProgress from 'material-ui/CircularProgress';
import Waypoint from 'react-waypoint';

export default class HomeProjects extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            model: PropTypes.instanceOf(Container)
        }
    }

    render() {
        const {model} = this.props;
        const projects = model.projects;
        const {activePage,recordsPerPage,total} = model.pagination;
        return (
            <div className='body'>
                <div>
                    <div className={styles.bk}>
                        <div style={
                            {
                                display:"flex",
                                fontFamily: "Lato, sans-serif",
                                fontSize: "1rem",
                                marginBottom: "2rem",
                                justifyContent: "flex-end",
                                paddingRight: "2.5rem"
                            }
                        }>
                            <GeneralInformation
                                cnt={ total }
                            />
                            {model.isLoading ? <CircularProgress size={0.6}/> : ""}
                        </div>
                        <ListProjects
                            projects={projects}/>

                        <div style={{display:"flex"}}>
                            {model.projects.length && !model.isLoading?
                                <Waypoint onEnter={model.loadMore}/> :
                                <CircularProgress size={0.6}/>}
                        </div>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}
/*
 <RaisedButton
 label="Load More"
 onClick={model.loadMore}/>
 {model.loadMoreErrorMessage}
 */
/*
 const style = {display:"flex",justifyContent: "center"};//TODO:move to css
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

 */
