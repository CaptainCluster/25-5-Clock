/**
 * @author       CaptainCluster
 * @link         https://github.com/CaptainCluster
 * @repository   25+5-Clock
 * @license      GNU-General-Public-License-v3.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './components/container';


//Due to the testing issues regarding React 18, this program will utilize
//React 17. I intended to make the jump to React 18 in this project.
ReactDOM.render(<Container />, document.getElementById('root'));