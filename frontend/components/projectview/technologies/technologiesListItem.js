import React, { PropTypes } from 'react';
import styles from '../project-view.sass';
import { DEFAULT } from '../../../constants/Api';

class TechnologiesListItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        	defultImage: DEFAULT + "technology.png"
        }
    }

    render(){
    	let item = this.props['data'];
		return (
			<div>
				<img alt={item.techName} src={this.state.defultImage
					/* (item.techAvatar ? item.techAvatar : this.state.defultImage)}*/ 
				}/>
				<div>
					<div>{item.techName}</div>
					<div>
						<span>
							<span>Version:</span>
							<span>{item.techVersion}</span>
						</span>
					</div>
				</div>
			</div>
		);
	}
};
export default TechnologiesListItem;