import React, { Component, PropTypes } from 'react';

class TabBody extends Component {
    constructor(props) {
        super(props);
    }
    render() {
    	//console.log(this.props.children)
    	//React.Children.map(this.props.children, function(child){
        //    console.log(child.props)
        //});
        return (
           	<div id={this.props.id}>
    			{this.props.children}
    		</div>
        )
    }
}

TabBody.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired 
};


export default TabBody;
