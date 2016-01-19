import fetch from 'isomorphic-fetch';

import { SUPER_SEARCH_API_URI, BUG_SIGNATURES_API_URI, BUGZILLA_BUG_API } from './constants.jsx';


export const FETCH_BUG_SIGNATURES = 'FETCH_BUG_SIGNATURES';
export const FETCH_SIGNATURE_STATUS = 'FETCH_SIGNATURE_STATUS';
export const FETCH_PROD_VER_COUNT = 'FETCH_PROD_VER_COUNT';

export const RECEIVE_BUG_SIGNATURES = 'RECEIVE_BUG_SIGNATURES';
export const RECEIVE_BUG_TITLE = 'RECEIVE_BUG_TITLE';
export const RECEIVE_SIGNATURE_STATUS = 'RECEIVE_SIGNATURE_STATUS';
export const RECEIVE_PROD_VER_COUNT = 'RECEIVE_PROD_VER_COUNT';

export const ERROR_BUG_SIGNATURES = 'ERROR_BUG_SIGNATURES';
export const ERROR_SIGNATURE_STATUS = 'ERROR_SIGNATURE_STATUS';
export const ERROR_PROD_VER_COUNT = 'ERROR_PROD_VER_COUNT';

export const CHANGE_BUG_NUMBER = 'CHANGE_BUG_NUMBER';


export function changeBugNumber(number) {
    return {
        type: CHANGE_BUG_NUMBER,
        number
    };
}

export function requestBugSignatures(number) {
    return {
        type: FETCH_BUG_SIGNATURES,
        number
    };
}

export function receiveBugSignatures(number, json) {
    return {
        type: RECEIVE_BUG_SIGNATURES,
        number,
        signatures: json.hits.map(hit => hit.signature),
        receivedAt: Date.now()
    };
}

export function fetchBugSignatures(number) {
    return dispatch => {
        dispatch(requestBugSignatures(number));

        return fetch(BUG_SIGNATURES_API_URI + '?bug_ids=' + number)
        .then(response => response.json())
        .then(json => {
            dispatch(receiveBugSignatures(number, json));
            json.hits.map(hit => dispatch(fetchSignatureStatus(hit.signature)));
        })
        .catch(ex => dispatch(errorBugSignatures(number)));
    };
}

export function errorBugSignatures(number) {
    return {
        type: ERROR_BUG_SIGNATURES,
        number
    };
}

export function requestSignatureStatus(signature) {
    return {
        type: FETCH_SIGNATURE_STATUS,
        signature
    };
}

export function receiveSignatureStatus(signature, json) {
    return {
        type: RECEIVE_SIGNATURE_STATUS,
        signature,
        data: json.facets.product,
        receivedAt: Date.now()
    };
}

export function fetchSignatureStatus(signature) {
    return dispatch => {
        dispatch(requestSignatureStatus(signature));

        return fetch(SUPER_SEARCH_API_URI + '?_results_number=0&_aggs.product=version&signature=' + encodeURI('=' + signature))
        .then(response => response.json())
        .then(json => {
            dispatch(receiveSignatureStatus(signature, json));
        })
        .catch(ex => dispatch(errorSignatureStatus(signature)));
    };
}

export function errorSignatureStatus(signature) {
    return {
        type: ERROR_SIGNATURE_STATUS,
        signature
    };
}

export function requestTotals() {
    return {
        type: FETCH_PROD_VER_COUNT
    };
}

export function receiveTotals(json) {
    let totals = {};
    json.facets.product.forEach(product => {
        product.facets.version.forEach(version => {
            totals[product.term + ':' + version.term] = version.count;
        });
    });

    return {
        type: RECEIVE_PROD_VER_COUNT,
        totals: totals,
        receivedAt: Date.now()
    };
}

export function fetchTotals() {
    return dispatch => {
        dispatch(requestTotals());

        return fetch(SUPER_SEARCH_API_URI + '?_results_number=0&_aggs.product=version')
        .then(response => {
            if (response.status >= 400) {
                dispatch(errorTotals());
            }
            return response.json();
        })
        .then(json => {
            dispatch(receiveTotals(json));
        })
        .catch(ex => dispatch(errorTotals()));
    };
}

export function errorTotals() {
    return {
        type: ERROR_PROD_VER_COUNT
    };
}

export function receiveBugTitle(number, json) {
    let title = '';
    if (json.bugs && json.bugs.length) {
        title = json.bugs[0].summary;
    }

    return {
        type: RECEIVE_BUG_TITLE,
        number,
        title
    };
}

export function fetchBugTitle(number) {
    return dispatch => {
        return fetch(BUGZILLA_BUG_API + number + '?include_fields=summary')
        .then(response => response.json())
        .then(json => {
            dispatch(receiveBugTitle(number, json));
        });
    };
}
