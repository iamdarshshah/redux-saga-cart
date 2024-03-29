import { take, fork, put } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

import { SET_CART_ITEMS, setItemDetails } from "./../actions";

export function* loadItemDetails(item) {
  const { id } = item;
  const response = yield fetch(`http://localhost:8081/items/${id}`);
  const data = yield response.json();
  const info = data[0];
  yield put(setItemDetails(info));
}

export function* itemDetailsSaga() {
  const { items } = yield take(SET_CART_ITEMS);
  var i = 0;
  for (i = 0; i < items.length; i++) {
    yield fork(loadItemDetails, items[i]);
  }
  // yield items.map((item, i) => fork(loadItemDetails, items[item]));
}
