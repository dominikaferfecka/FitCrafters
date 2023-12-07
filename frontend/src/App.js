import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [managerName, setManagerName] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/').then(res => res.json()).then(data => {
      setManagerName(data.manager_name);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>The manager's name is {managerName}.</p> <br/>
      </header>
    </div>
  );
}

export default App;