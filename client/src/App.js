import React, { Component } from 'react';
import io from 'socket.io-client';
import Login from './Login';
import UsersList from './UsersList';
import Chat from './Chat';
import './App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            socket : io('http://localhost:3017'),
            avatar: null,
            user: '',
            courantLogged : false
        };
    }

    componentDidMount() {
        this.state.socket.on('logged', (newUser) => {
            this.setState({
                user: newUser,
                courantLogged : true
            });
        });
    }

    render() {
        var state;

        if(this.state.courantLogged) {
            state = <div><UsersList socket={this.state.socket} /> <Chat socket={this.state.socket} /></div>
        } else {
            state = <Login socket={this.state.socket} courantLogged={this.state.courantLogged}/>
        }

        return (
            <div className="App">
                <header className="App-header">
                    <div id="my-irc">
                        <h2>MY_IRC</h2>
                    </div>
                    {state}
                </header>
            </div>
        );
    }
}

export default App;