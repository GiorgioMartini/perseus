import React from 'react';
import CharacterSelector from './CharacterSelector'
// REMOVE ROUTER FROM PACKAGE ???
// import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="mw7 center sans-serif bg-white black-70">
      <CharacterSelector />
    </div>
  );
}

export default App;
