
import React from 'react';

import styles from './gui.css';

class Gui extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.gui}>
        <div className={styles.panel}>
          <h1>doggy</h1>
        </div>
      </div>
    );
  }
}

export default Gui;
