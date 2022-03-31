import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './Style.css';


document.title = "Wordle Solver";
document.bgColor = "black";
ReactDOM.render(
  <React.StrictMode>
    <div className='Site'>
      <App />
    </div>
    
  </React.StrictMode>,
  document.getElementById('root')
);


