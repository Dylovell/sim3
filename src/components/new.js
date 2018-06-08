import React, { Component } from 'react';
import axios from 'axios';
import Header from './header'

export default class New extends Component {
    constructor(){
        super()
        this.state = {
            postNameInput:'',
            postPictureInput:'',
            postContentInput:''
        }
    }

    submitPost(){
        let body = {
            name:this.state.postNameInput,
            picture:this.state.postPictureInput, 
            content:this.state.postContentInput
            }
        axios.post('/api/new', {body:body})
        .then(()=>{
            this.setState({postNameInput:'',postPictureInput:'',postContentInput:''})
        }).then(this.props.history.push('/dashboard'))
    }

    

    render() {
        console.log(this.state.postNameInput)
        return (
            <div>
                <Header/>
                <p>ADD A NEW POST</p>
                <div>Title:<input onChange={(e)=>{this.setState({postNameInput:e.target.value})}}/></div>
                <div>Picture:<input onChange={(e)=>{this.setState({postPictureInput:e.target.value})}}/></div>
                <div>Content:<input onChange={(e)=>{this.setState({postContentInput:e.target.value})}}/></div>
                <button className='' onClick={()=>{this.submitPost()}}>Submit your Post</button>
            </div>  
        )
    }
}