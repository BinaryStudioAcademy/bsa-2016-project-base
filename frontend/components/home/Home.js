import React, {Component} from 'react';
import Old from "./HomeOld"
import New from "./HomeProjects"
import Search from "./search/ReduxWrapper"
export default class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {

        return (<div>
                <Search/>
                <New/>
            </div>
        )
    }
}
