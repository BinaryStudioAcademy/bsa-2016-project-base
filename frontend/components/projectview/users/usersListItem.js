import React from 'react';
import { Link } from 'react-router';
import { DEFAULT } from '../../../constants/Api';

import styles from '../project-view.sass';

class userListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
        	defaultImage: DEFAULT + "user.png"
        };
    }
  
    render() {
    	const item = this.props['data']; 
    	return (
    	    <li className={styles['usersList-Item']}>
                <Link to={`/api/users/${item._id}`} className={styles['link']}>
                    <img src={this.state.defaultImage
                    	/*(item.avatar ? item.avatar : this.state.defaultImage)*/
                    } />
                    <div>
                        <span>{item['userName'] + ' ' + item['userSurname']}</span>
                        <div>
                           <span className={styles[this.props['marker']]} />
                           {item.position}
                        </div>
                    </div>
                </Link>
            </li>
        );
    }
}
export default userListItem; 