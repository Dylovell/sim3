import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import Post from './components/post';
import New from './components/new';



export default 
         (
            <Switch>
                <Route exact path= '/' component={Auth}/>
                <Route path='/dashboard' component={Dashboard} />
                <Route exact path='/post/:id' component={Post} />
                <Route path='/new' component={New} />
            </Switch>
        )

 

 