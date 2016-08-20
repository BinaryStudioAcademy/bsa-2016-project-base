import React from "react"
import {PropTypes} from "react"
import Root from "./ContainerWithHideButtonSearchFieldAndSubmit"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ReduxWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    getReduxData(){
        const store = this.props.store.HomeSearchReducer;
        return {
            searchString:store.searchString,
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
            updateSearchString:actions.updateSearchString,
            goSearch:actions.goSearch,
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
            /**{
            *       searchString,
             *      showSearch,
             *      selectedTab,
             *      data:{
             *          tags: {values, custom, tips},
             *          users: {values, custom, tips},
             *          technologies: {values, custom, tips},
             *          date: {values:[{
             *              upper,lower}],
             *              custom:{upper,lower}
             *              tips:[]empty
             *          }
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