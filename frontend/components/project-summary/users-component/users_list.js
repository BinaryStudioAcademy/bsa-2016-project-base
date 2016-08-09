import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from './actions/index';
console.log(fetchUsers);
import CheckBox from './checkbox';
import styles from './users.sass';
import { Row, Col, ListGroup, ListGroupItem, FormControl, FormGroup, InputGroup, Modal, Label, Glyphicon, Button } from 'react-bootstrap';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };
    }

    componentWillMount() {
        this.props.fetchUsers();
    }

    updateSearch(event) {
        this.setState({search: event.target.value});
    }

    render() {
        // console.log(this.props.users[0]);
        let search = (text, search) => {
            search = search.replace(/\ /g, '').toLowerCase();
            let tokens = text.split('');
            let searchPosition = 0;

            tokens.forEach((char, i) => {
                if (char.toLowerCase() === search[searchPosition]) {
                    searchPosition++;
                }
                if (searchPosition >= search.length) {
                    return false;
                }
            });

            if (searchPosition != search.length) {
                return '';
            }

            return tokens.join('');
        }

        let filteredUsers = this.props.users.filter(user => {
            return search(user.userName, this.state.search);
        });

        let users = filteredUsers.map((user) => {
            return (
                <li key={user._id} className={styles.listItem}>
                    <div className={styles.userImage}><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgTBhMPExAVEhETGB8VGBcXGRIZExohIBwXGBYdGBgkISklHx8xHR0UITUlJikyLi4vFx8zODMtNysvLjABCgoKDg0OGxAQGzchGiY3NyswMjUuNysvMy0tLTEtLSstKy0tNystLy8tKystNS0tLS0tLi0tNTctLS0wLS0rMP/AABEIAEQARAMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAwQFBgcCAf/EADgQAAEDAQQGBwUJAQAAAAAAAAEAAhEDBAUSIRMUMVFxsQYzYWJykZIWIkGh0iMkMlJTgbLB0Qf/xAAaAQACAwEBAAAAAAAAAAAAAAAABQEDBAIG/8QALxEAAgECAwYFAwUBAAAAAAAAAAECAxEEEjEFEyFRkcEUQlJhgTJB8CIzYtHxJP/aAAwDAQACEQMRAD8A3FAHkhRdAEhGZE2CQjMgsEhGZBYJCMyCwSEXRFj1SAIA8eYaTuUMCCfbZgwCSJzXlq2Mbd2rv3GUaPA51zujyCp8W/Suh1uvcNc7o8gjxb9K6BuvcNc7o8gjxb9K6BuvcNc7o8gjxb9K6BuvcNc7o8gjxf8AFdA3XuSN22jE4t+EA8x/Se7Nruomvt+f0Y68Mo/TMznFbqjwKh6AioGpkOA5Lw89R4kKUadZw90CN5THBbMliI527IzV8SqTy2uzmrja6HCD8lnxmDlhp2bunoWUKqqq6ONKsZdlF6dC0OZIAA7dqdUNjynTUpSs2YamMUZWSuIueQ6DkQldejKjUcJao105KcVJEtcDpru8I5uTrY3m+O5jxi0JxPDCcVupdwKh6ErUoTquzgOS8RPU9DGPAeWC2WjV/dLIk7Q4nmE+wWJlSoqKQsxFFTqNsLUbQ9wJcwRua76lxi/+m2bhbkTQW5vb7iOr1vzt9J+pY/BQ5s0b98h6y1WoMAmnkI/C76k3hjJRio20MMsPFtu4wtdeprPvEEkTkCOzeUn2h+ue8erN+FVo5ORNdF3zXf4Rzct+x/N8dzPj1a35yLEnYuOK/Uu4FQ9CVqZm6rs4DkF4qS4nqIrgOrvqxZ47SmlH6ELKy/Wxzp1aVEZa+kdipurhxd93DC+B+pOADef9C7VNu3v2OXJK5KGuuDoYW6r94adwWPGcYpGzCR4ssHQ1813+BvN63bH83x3M20lbL89i1J2KxOv1DuB5KHoStTIq1vFOqxxEiBPkF45J34anqpQvGwpTvmnUt7cpaAS6MsoWnDqbldmTEQjGBJW4PFOWsDMjnjYdsQYJW4wGYXq2q2vWZVvCHVrRSDgRRktaKZbUduiDkMvdz+K2wd0mo6J/4USVrps0GhaX6iPtNIcM48hi+IMDJYZfe3A0w+1xs7pBS1LBAxbIjOUsanezGipLVFw6APJqVJ24G83prsnWXx3F+1FbL89i5J0KBO0dQ7geSh6ErUxiq8ED4jCOQXi5cGe0gro8pljaUCGyE1o/QhJiP3JHjCwAzBnsVt2UWIOhddSaOMMOGvUrP2GZ0mjAy2Q5uXYrnVXG3JIrVPQsAriIGxUFolU0ch2ETO1ZMX9KGGAu5NMu3/O3zXq+Bv8AKotuyPN8dzLtfy/PYvCdCU8cAWxvQBnd7dA7UbY51GrhYTMFuKOGYySyrsyE5Zk7DWjtWdOOVq5Urzo1KNrNFxlzAATsn9lRKnu3k5BvN48/Ma6ZQAaZABpkAS1yXPabWHNpvDSwycp25bwuo4VYjg3ax1HFPDu9r3NJ6KXA2y2UguxPd+Jx+Q4Jlh8PGjHLEwYjESryzSJ1XmcEACAK/enR+wVLUXuDg47YcQuHTg3do6U5LRjP2Vuzv+tyjdQ9K6BnlzD2Vuzv+tyN1D0roGeXMPZW7O/63I3UPSugZ5cyXuS6rLRacAMnaSZPmuowjHRWIcm9SVXRAIA//9k=" /></div>
                    <div className={styles.userName}>{user.userName + " " + user.userSurname}</div>
                    <div className={styles.userPosition}>Front-End Developer</div>
                    <CheckBox isOwner = {user.isOwner}/>
                </li>
            );
        });

        return (
            <div className={styles.wrapper}>
                <h1>Users</h1>
              <div className={styles.inputContainer}>
                  <div className={styles.wrapperSearch}>
                  <InputGroup>
                    <InputGroup.Addon className={styles.searchSign}>
                        <Glyphicon glyph="search" className={styles.searchIcon} />
                    </InputGroup.Addon>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            onChange={ this.updateSearch.bind(this)}
                        />
                    </InputGroup></div>
                   </div>
                <ul className={styles.userList}>
                    {users}
                </ul>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUsers }, dispatch);
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
