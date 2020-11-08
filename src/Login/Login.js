import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }   
    validateForm = () => {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }
    handleSubmit = (event) => {                
        event.preventDefault();
        this.props.setUserAuth(this.state.username,this.state.password);
    }
    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <br/><br/>
                    <TextField
                        label="Username"
                        id="outlined-size-normal"                    
                        variant="outlined"
                        autoFocus="true"
                        required="true"  
                        onChange={this.handleUsernameChange.bind(this)}                  
                    /><br/><br/>
                    <TextField
                        label="Password"
                        id="outlined-size-normal"                    
                        variant="outlined"
                        required="true"
                        onChange={this.handlePasswordChange.bind(this)}
                        type="password"
                    /><br/><br/>
                    <Button variant="contained" color="primary" size="large" type="submit">Submit</Button>
                </form>
                
            </div>
            
        );
    }
}

export default Login;