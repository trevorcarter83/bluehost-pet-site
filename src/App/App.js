import Login from '../Login/Login.js';
import PetsDashboard from '../PetsDashboard/PetsDashboard.js';
import PetsIcon from '@material-ui/icons/Pets';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      username: "",
      password: ""
    }
  }
  setUserAuth = (usrname, pssword) => {    
    this.setState({
      authenticated: true,
      username: usrname,
      password: pssword
    });
  }
  render(){
        
    let headerText;
    let pageContent;
    /* if the user isn't authenticated, show login component and header*/
    if(!this.state.authenticated){
      headerText = <h1>Login <PetsIcon fontSize="large" /></h1>;
      pageContent = <Login setUserAuth={this.setUserAuth} />;
    }
    /* else render the pets dashboard */
    else{
      headerText = <h1>{this.state.username}'s Pets <PetsIcon fontSize="large" /></h1>;
      pageContent = <PetsDashboard user={this.state.username}/>
    }
    
    return (
      <div className="App">
        <header className="App-header">
          {headerText}															
        </header>
        <div>
          {pageContent}
        </div>
      </div>
    );
  }
}

export default App;
