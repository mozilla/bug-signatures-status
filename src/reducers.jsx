import { combineReducers } from 'redux';
import {
    FETCH_BUG_SIGNATURES, FETCH_SIGNATURE_STATUS, RECEIVE_BUG_TITLE,
    RECEIVE_BUG_SIGNATURES, RECEIVE_SIGNATURE_STATUS,
    FETCH_PROD_VER_COUNT, RECEIVE_PROD_VER_COUNT
} from './actions.jsx';


function bug(state = {
    isFetching: false,
    didInvalidate: false,
    signatures: [],
    title: ''
}, action) {
    switch (action.type) {
        case FETCH_BUG_SIGNATURES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_BUG_SIGNATURES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                signatures: action.signatures,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_BUG_TITLE:
            return Object.assign({}, state, {
                title: action.title
            });
        default:
            return state;
    }
}

function bugs(state = {}, action) {
    switch (action.type) {
        case FETCH_BUG_SIGNATURES:
        case RECEIVE_BUG_SIGNATURES:
        case RECEIVE_BUG_TITLE:
            return Object.assign({}, state, {
                [action.number]: bug(state[action.number], action)
            });
        default:
            return state;
    }
}


function signature(state = {
    isFetching: false,
    didInvalidate: false,
    data: []
}, action) {
    switch (action.type) {
        case FETCH_SIGNATURE_STATUS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_SIGNATURE_STATUS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                data: action.data,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

function signatures(state = {}, action) {
    switch (action.type) {
        case FETCH_SIGNATURE_STATUS:
        case RECEIVE_SIGNATURE_STATUS:
            return Object.assign({}, state, {
                [action.signature]: signature(state[action.signature], action)
            });
        default:
            return state;
    }
}

function productVersionCounts(state = {
    isFetching: false,
    didInvalidate: false,
    totals: {}
}, action) {
    switch (action.type) {
        case FETCH_PROD_VER_COUNT:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_PROD_VER_COUNT:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                totals: action.totals,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
  bugs,
  signatures,
  productVersionCounts
});

export default rootReducer;
