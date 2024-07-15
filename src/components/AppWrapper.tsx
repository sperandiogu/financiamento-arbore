import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../app/App';

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
