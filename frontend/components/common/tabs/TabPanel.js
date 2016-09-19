import React, { Component, PropTypes } from 'react';

class TabPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: this.props.activeIndex
        };

        this.onTabSelect = this.onTabSelect.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
    }
    onTabSelect(e, activeIndex) {
    	console.log('Clicked '+activeIndex);
        this.setState({
            activeIndex
        })
    }
    renderButtons() {
    	const activeIndex = this.state.activeIndex;
    	const onTabSelect = this.onTabSelect;
        let heads = [];
        let body;
        
        React.Children.map(this.props.children, (child) => { 
            const index = child.props.index;
            if (child.type.name === "TabHead") {
                heads.push(
                    <span onClick={(e) => onTabSelect(e, index)} key={"tab_head_"+index}>
                        {child}
                    </span>
                );
            } else if (child.type.name === "TabBody") {
                if (index=== activeIndex) body = child; 
            }
        });

        return {heads, body};
    }
    render() {
    	const {heads, body} = this.renderButtons()
        return (
           	<div id={this.props.id}>
           		{heads}
    			{body}
    		</div>
        )
    }
}

TabPanel.propTypes = {
    id: PropTypes.string,
    activeIndex: PropTypes.number
};
TabPanel.defaultProps = {
	activeIndex: -1,
};
export default TabPanel;
