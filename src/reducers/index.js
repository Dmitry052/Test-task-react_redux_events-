import {combineReducers} from 'redux';
import events from './events.js';
import findEvents from './findEvents.js';

export default combineReducers({
    events,
    findEvents
})