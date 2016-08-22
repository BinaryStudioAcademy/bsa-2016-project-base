import React, { Component, PropTypes } from 'react';
import styles from './CustomDropDownComponent.sass';
import FaOpenDialog from 'react-icons/lib/fa/angle-double-down';
import FaCloseDialog from 'react-icons/lib/fa/angle-double-up';

export default class RightsUsersList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {display: 'none'};
	}
 	render() {
 		var items = [],data = this.props['data'],visible,
 			displayArrow = ((this.state['display'] != 'none') ? 
 				(<FaCloseDialog size={20} style={{color:'#FC5A5A'}} />):
 				(<FaOpenDialog size={20} style={{color:'#2ECC71'}}  />)
 			);
 		for(var i in data){
 			var current = data[i][this.props['valueField']];
 			if((this.props['current'] == current)) 
 				visible = data[i][this.props['visibleField']];
 			items.push(<span onClick={(e)=>{
 				if(typeof this['props'].onItemClick == 'function') 
 					this['props'].onItemClick(e['target'].getAttribute('data-id'));
 				this.setState({display: 'none'})
 			}}  key={current}  data-id={current}>
 			   {data[i][this.props['visibleField']]}
 			</span>);
 		}

 		return (
 			<div>
 				<span onClick={()=>{
 					this.setState({display: 
 						((this.state['display'] == 'none') ? 'block' : 'none')
 					});
 				}} className={styles['dropDown-CurrentLabel']}>
 					{displayArrow}
 					{visible}
 				</span>
 				<div style={this.state} className={styles['dropDown-List']}>
 					<div className={styles['dropDown-ListScrollableBox']}>{items}</div>		
 				</div>
 			</div>
 		);
	}
};
