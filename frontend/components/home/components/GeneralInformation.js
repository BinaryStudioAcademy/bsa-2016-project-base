import React, { Component } from 'react';
import styles from './GeneralInformation.sass';
import FaList from 'react-icons/lib/fa/list';
export default class GeneralInformation extends Component {

    static propTypes = {
        cnt: React.PropTypes.number.isRequired
    };

    render() {
        const { cnt } = this.props;

        return (            
            <div className={styles.count}>
                {(cnt)?
                    <div>
                        <FaList size={20} />
                        <span>{`Projects (${cnt})`}</span>
                    </div>:
                    <div>
                        <FaList size={20} />
                        <span>Projects not found</span>
                    </div>
                }
            </div>
        )
    }
}