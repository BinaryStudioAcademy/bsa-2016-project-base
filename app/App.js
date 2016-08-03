import React from 'react';
import { Link } from 'react-router';
import styles from './app.sass';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo23'};
  }
  render() {
    return (
      <div className={styles.app}>
      <h1>Navigate to section you'd like to:</h1>
        <div className={styles.menuItem}>
            <Link to="/admin">Admin Area</Link>
        </div>
      </div>
    );
  }
}
