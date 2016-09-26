import React, { PropTypes } from 'react';
import styles from '../project-view.sass';
import { DEFAULT } from '../../../constants/Api';

class TechnologiesListItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            defaultImage: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-128.png'
        	// defultImage: DEFAULT + "technology.png"
        }
    }

    render(){
    	let item = this.props['data'];
		return (
			<div className='tech'>
				<img alt={item.techName} src={item.techAvatar
					/* (item.techAvatar ? item.techAvatar : this.state.defultImage)}*/ 
				} />
                <div className='tech-name'>{item.techName}</div>
				{/*<div className='tech-v'>
					Version: {item.techVersion}
				</div>*/}
			</div>
		);
	}
};
export default TechnologiesListItem;