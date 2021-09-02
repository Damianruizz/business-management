import { get, post, put, del } from "../../utils/fetch";
import {
  BUSINESSES_FETCH_STARTED,
  BUSINESSES_RETRIVED,
  BUSINESSES_CREATED,
  BUSINESSES_UPDATED,
  BUSINESSES_DELETED,
} from "./actionTypes";

export const getBusinesses = () => dispatch => {
  dispatch({ type: BUSINESSES_FETCH_STARTED });

  return get("business")
    .then(data => {
      dispatch({
        type: BUSINESSES_RETRIVED,
        data,
      });
      return data;
    })
    .catch(error => {
      return Promise.reject({ error });
    });
};

export const createBusinesses = payload => dispatch => {
  dispatch({ type: BUSINESSES_FETCH_STARTED });

  return post("business", payload)
    .then(data => {
      dispatch({
        type: BUSINESSES_CREATED,
        data,
      });
      return data;
    })
    .catch(error => {
      return Promise.reject({ error });
    });
};

export const editBusinesses = payload => dispatch => {
  dispatch({ type: BUSINESSES_FETCH_STARTED });
  const { businessId, name } = payload;

  return put(`business/${businessId}`, { name })
    .then(data => {
      dispatch({
        type: BUSINESSES_UPDATED,
        data,
      });
      return data;
    })
    .catch(error => {
      return Promise.reject({ error });
    });
};

export const deleteBusiness = businessId => dispatch => {
  dispatch({ type: BUSINESSES_FETCH_STARTED });

  return del(`business/${businessId}`)
    .then(data => {
      dispatch({
        type: BUSINESSES_DELETED,
        data,
      });
      return data;
    })
    .catch(error => {
      return Promise.reject({ error });
    });
};
