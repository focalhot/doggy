import React from 'react';
import ReactDOM from 'react-dom';

import Gui from './conponents/gui/gui';
import './css/normalize.css';
import './css/main.css';

const Index = () => (
  <div>
    <Gui />
  </div>
);
export default Index;
ReactDOM.render(<Index />, document.getElementById('app'));
