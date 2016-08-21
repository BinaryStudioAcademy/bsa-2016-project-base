import React from "react"
import {PropTypes} from "react"
import Root from "./ContainerWithHideButtonSearchFieldAndSubmit"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export default class ReduxWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    getData(){
        const store = this.props.store.HomeSearchReducer;
        const actions = this.props;
        return {
            searchString:store.searchString,
            showSearch:store.showSearch,
            selectedTab:store.selectedTab,
            data:[{
                    data:store.tags,
                    receiver:actions.receiverTags
                }, {
                    data:store.users,
                    receiver:actions.receiverUsers
                },{
                    data:store.technologies,
                    receiver:actions.receiverTechnologies
                },{
                    data:store.date,
                    receiver:actions.receiverDate
                }
            ]
        }
    }
    getReceiver(){
        const actions = this.props;
        return {
            updateSearchString:actions.updateSearchString,
            goSearch:actions.goSearch,
            handleSearchShow:actions.handleSearchShow,
            handleSearchDismiss:actions.handleSearchDismiss,
            selectedTabChanged:actions.selectedTabChanged,

        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                <Root
                    data={this.getData()}
                    receiver={this.getReceiver()}
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