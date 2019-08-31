
import React from 'react';
import Dropzone from 'react-dropzone';

import styles from './gui.css';

class Gui extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.gui}>
        <div className={styles.panel}>
          <Dropzone onDrop={acceptedFiles => console.log('acceptedFiles:', acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
}

export default Gui;
