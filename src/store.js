import { createStore, applyMiddleware } from "redux";
import reducer from "./ducks/reducer";
import promiseMiddleware from 'redux-promise-middleware'

//dont forget to add the provider from react-redux in your index file 

export default createStore( reducer, applyMiddleware(promiseMiddleware()) );