import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './header'
import {getUser} from './../ducks/reducer';

class Post extends Component {
    componentDidMount(){
        this.props.getUser();
    }
    render() {
        return (
            <div>
                <Header/>
                <p>My Posts</p>

            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user,
    }
}

export default connect(mapStateToProps,{getUser})(Post);
