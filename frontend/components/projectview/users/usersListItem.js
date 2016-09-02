import React from 'react';
import styles from './users.sass';
import { Link } from 'react-router';
import { DEFAULT } from '../../../constants/Api';

class userListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
        	search: '',
        	defaultImage: DEFAULT + "user.png"
        };
    }
  
    render() {
    	let item = this.props['data']; 
    	return (
    	    <li className={styles['user-item']}>
                <Link to={`/api/users/${item._id}`} className={styles['link']}>
                    <img src={this.state.defaultImage
                    	/*(item.avatar ? item.avatar : this.state.defaultImage)*/
                    } />
                    <div>
                        <div className={styles['user-name']}>
                            {item['userName'] + ' ' + item['userSurname']}
                        </div>
                        <div className={styles['user-position']}>
                           <span className={styles[item.marker]} />
                           {item.position}
                        </div>
                    </div>
                </Link>
            </li>
        );
    }
}
export default userListItem; 