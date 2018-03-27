import React from 'react';
import ReactDOM from 'react-dom';
import ChartOptions from './ChartOptions';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChartOptions />, div);
    ReactDOM.unmountComponentAtNode(div);
});
