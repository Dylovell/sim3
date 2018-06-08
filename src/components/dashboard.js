import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getPosts, getUser} from './../ducks/reducer';
import Header from './header'

 class Dashboard extends Component {
    componentDidMount(){
        this.props.getPosts();
        this.props.getUser();
    }

    render() {
        
        let post = this.props.posts.map((el,i)=>
            <div key={i} id='product'>
                <div className='posttitle'>{el.post_name}</div>
                    <img alt={[i]} src={el.picture} />
                    <div className='content'>{el.content}</div>
                <hr/>
            </div>
        )
        return (
            <div>
                <Header/>
                <p>Dashboard</p>
                {post}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        posts: state.posts
    }
}

export default connect(mapStateToProps,{getPosts, getUser})(Dashboard);