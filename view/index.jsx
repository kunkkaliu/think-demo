import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import App from '@view/app';

render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

if (module.hot) {
	module.hot.accept();
}
