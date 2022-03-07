import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';
import axios from 'axios';

export const getItems = () => dispatch => {
  dispatch(setItemLoading); // make item loading
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
};

export const addItem = (item) => dispatch => {

  axios.post('/api/items', item)
    .then(res => dispatch({
      type: ADD_ITEM,
      payload: res.data
    }))
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id
  };
};

export const setItemLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};