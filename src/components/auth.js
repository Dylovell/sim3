import React, { Component } from 'react';

export default class Auth extends Component {
    render() {
        return (
            <div>
                <p>AUTH</p>
                <hr/>
                <a href={process.env.REACT_APP_LOGIN}>
                    <button>LOGIN... </button>
                </a>  
            </div>
        )
    }
}
