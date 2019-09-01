
import React from 'react';
import Dropzone from 'react-dropzone';
import toastr from 'toastr';

import styles from './gui.css';

const { exec } = require('child_process');

class Gui extends React.Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const dest = file.path.split('.').slice(0, -1);
        exec(`/usr/local/bin/ffmpeg -i ${file.path} -profile:v main -level 4.2 -x264opts crf=29 ${dest}.mp4`, (error) => {
          if (error) {
            toastr.error(`exec error: ${error}`);
          }
          toastr.success(`${file.name}: convert video success`);
        });
      }
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.gui}>
        <div className={styles.panel}>
          <Dropzone onDrop={this.onDrop}>
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
