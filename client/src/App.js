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
            socket: io('http://localhost:3001'),
            avatar: null,
            user: '',
            courantLogged: false
        };
    }

    componentDidMount() {
        this.state.socket.on('logged', (newUser) => {
            this.setState({
                user: newUser,
                courantLogged: true
            });
        });
    }

    render() {
        return (
            <div className="app">
                {this.state.courantLogged &&
                    <>
                        <Chat socket={this.state.socket} />
                        <UsersList socket={this.state.socket} />
                    </>
                }

                {!this.state.courantLogged &&
                    < Login
                        socket={this.state.socket}
                        courantLogged={this.state.courantLogged}
                    />
                }
            </div>
        );
    }
}

export default App;