/**
        Produces a login page that allows the developer to choose
        what authentication service to use and how to handle its 
        response.
        
            Props:
                a) authenticationEndpoint (string): the url of the authentication service
                
                b) onAuthentication (function): initiates request for authentication and handles the response of the authentication service
                    1st Param: authenticationEndpoint
                    2nd Param: credentials (javascript object): 
                        Contains the username and password submitted via the input fields
**/




import React, { Component } from 'react'
import './LoginAndSignup.css'


class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {username: undefined, password: undefined}
    }
    
    handleSubmit() {
        const endpoint = this.props.authenticationEndpoint
        const callback = this.props.onAuthentication
        const credentials = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
        callback(endpoint, credentials)

    }
    
    updateUsername(event) {
        const value = event.target.value
        this.setState({username: value})
    }
    
    updatePassword(event) {
        const value = event.target.value
        this.setState({password: value})
    }
    
    render() {        
        return (
            <div className="Login">
                <h1>{this.props.title}</h1>
                <input type="text" className="formElem" placeholder="Username" onChange={event => this.updateUsername(event)}/>
                <input type="password" className="formElem" placeholder="Password" onChange={event => this.updatePassword(event)}/>
                <button className="formElem" onClick={() => this.handleSubmit()}>Submit</button>
                <a href="#">Sign Up</a>
            </div>
        )
    }
}


module.exports = Login