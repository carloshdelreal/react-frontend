import React from 'react';
import logo from './assets/images/logo.svg';
import ButtonExample from './components/UI/ButtonExample';
import './App.css';

function App() {
  const buttonStyles = {
    container: {
      width: 200, 
      height: 40, 
      borderRadius: 20, 
      display: 'flex', 
      justifyContent: 'center'
    },
    text: {
      fontSize: 16,
      margin: 0,
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ButtonExample 
          onClick={() => console.log('Hi')}
          text={'Button'} 
          buttonStyle={buttonStyles.container}
          textStyle={buttonStyles.text}
        />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
