import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className={styles.app}>
        bar
      </div>
    );
  }
}

export default App;
