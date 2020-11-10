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
    //prefixes of implementation that we want to test
    // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // //prefixes of window.idb objects
    // window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    // window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
    
    // if (!window.indexedDB) {
    // window.alert("Your browser doesn't support a stable version of IndexedDB.")
    // }    
    debugger
    const dbName = "petsDashboard"
    var petsDB;
    var request = indexedDB.open(dbName, 1);

    request.onerror = function(event){
        console.log("success: " + event.target.errorCode);
    };
    request.onupgradeneeded = function(event){
        petsDB = event.target.result;
        var objectStore = petsDB.createObjectStore("dogs", {keyPath: "id"});
    };
    request.onsuccess = function(){
      petsDB = request.result;
    };    
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
      pageContent = <PetsDashboard db={petsDB}/>
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
