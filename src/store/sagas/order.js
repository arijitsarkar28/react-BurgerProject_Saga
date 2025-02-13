import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post( '/orders.json?auth=' + action.token, action.orderData );
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));  
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    try {
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const reponse = yield axios.get( '/orders.json' + queryParams);
        const fetchedOrders = [];
        for ( let key in reponse.data ) {
            fetchedOrders.push( {
                ...reponse.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
        yield put(actions.fetchOrdersFail(err));
    }
}