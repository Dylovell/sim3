import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App.css';
import {getUser} from './../ducks/reducer';
import {Link} from 'react-router-dom';


class Header extends Component{
    componentDidMount(){
        this.props.getUser();
    }

    render(){
   return(
        <div className='App-header'>
            <p>Welcome: {this.props.user.user_name}</p>
            <hr/>
                <Link to='/dashboard'>Dashboard</Link>
            <hr/>
                <Link to='/new'>New</Link>
            <hr/>
            <a href="http://localhost:3000/auth/logout">
                <button type="" className="">logout</button>
            </a>
        </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
    }
}

export default connect(mapStateToProps,{getUser})(Header);
