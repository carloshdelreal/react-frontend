import React from 'react';
import logo from './assets/images/logo.svg';
import ButtonExample from './components/UI/ButtonExample';
import InfoPopover from './components/UI/InfoPopover';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 20}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img alt='Darcie Logo' style={{width: 72, height: 72}} src={require('./assets/images/favicon.png')} />
          <h3 style={{marginLeft: 10}}>Food Bank Support</h3>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '12.5vw'}}>
          <InfoPopover title='About'>
            <p> 
              Darcie is an automated phone line anyone can call to find human services near them, 
              such as free food, legal assistance, non-emergency medical help, and more. Read more 
              and watch a live stream of the conversations at 
              <a href="http://www.darcie.me">darcie.me</a><br/>
              <b>COVID-19 Update</b> Darcie was intended to pull from all services listed in the
              <a href="https://sfserviceguide.org/">SF Service Guide</a>
              , however in the current times the format of the data in that database (a.k.a. 
              <a href="https://github.com/sheltertechsf/askdarcel-api">AskDarcel on github</a>) 
              made it hard to keep the information up to date with service hours & offerings changing. 
              We pivoted Darcie to pull from a seperate Algolia index which consists of all hygiene 
              stations & places handing out food in SF. The dialog & webhook have been adopted accordingly.
            </p>
          </InfoPopover>
          <InfoPopover title='Contact'>
            <p>
              Contributing, Branching, & Forking While we actively accept help, as well as encourage you
              to fork this repo and build it out for your city, we do not take pull requests directly to
              this repo - please contact us before you plan to do so. Reach out to: <br/>
              Repo <a href = "https://github.com/ShelterTechSF/VACS-MVP">Github</a> <br/> 
              Twitter <a href="https://twitter.com/dariceshelter">@dariceshelter</a>
            </p>
          </InfoPopover>
        </div>
      </div>
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
