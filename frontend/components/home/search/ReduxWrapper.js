import React from "react"
import {PropTypes} from "react"
import Root from "./ContainerWithHideButton"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ReduxWrapper extends React.Component {
    constructor() {
        super();
    }
    getReduxData(){
        const store = this.props.store.HomeSearchReducer;
        return {
            showSearch:store.showSearch,
            selectedTab:store.selectedTab,
            data:{
                tags: store.tags,
                users: store.users,
                technologies: store.technologies,
                date: store.date
            }
        }
    }
    getReduxReceiver(){
        const actions = this.props;
        return {
            handleSearchShow:actions.handleSearchShow,
            handleSearchDismiss:actions.handleSearchDismiss,
            selectedTabChanged:actions.selectedTabChanged,
            dataReceiver:{
                tags:actions.receiverTags,
                users:actions.receiverUsers,
                technologies:actions.receiverTechnologies,
                date:actions.receiverDate
            }

        }
    }
    static get propTypes() {
        return {
            /**
             *      showSearch,
             *      selectedTab,
             *      data:{
             *          tags: {values, custom, tips},
             *          users: {values, custom, tips},
             *          technologies: {values, custom, tips},
             *          date: {upper,lower}
             *      }
             * }
             */
            //reduxData:PropTypes.object.isRequired,
            /**
             * {
             *      handleSearchShow,
             *      handleSearchDismiss,
             *      selectedTabChanged,
             *      dataReceiver:{
             *          tags,
             *          users,
             *          technologies,
             *          date
             *      }
             * }
             */
            //reduxReceiver:PropTypes.object.isRequired
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                <Root
                    reduxData={this.getReduxData()}
                    reduxReceiver={this.getReduxReceiver()}
                />
                    </MuiThemeProvider>
            </div>

        )
    }
}
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/HomeSearchActions';
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxWrapper);