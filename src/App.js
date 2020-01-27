import React from 'react';
import './App.css';
import BusSchedulingWidget from 'components/bus-scheduling-widget';
import data from 'data/bus-scheduling-input.json';

function App() {
  return (
    <div className="App">
      <BusSchedulingWidget trips={data} />
    </div>
  );
}

export default App;
