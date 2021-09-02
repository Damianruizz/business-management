import {
  BUSINESSES_FETCH_STARTED,
  BUSINESSES_RETRIVED,
  BUSINESSES_CREATED,
  BUSINESSES_UPDATED,
  BUSINESSES_DELETED,
} from "./actionTypes";

const initialState = {
  businesses: [],
  isLoading: false,
};

const businessReducer = (state = initialState, action) => {
  switch(action.type) {
    case BUSINESSES_FETCH_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case BUSINESSES_RETRIVED:
      return {
        ...state,
        ...action.data,
        isLoading: false,
      };
    case BUSINESSES_CREATED:
    case BUSINESSES_DELETED:
      return {
        ...state,
        isLoading: false,
      };
    case BUSINESSES_UPDATED:
      return {
        ...state,
        businesses: state?.businesses?.map(act => ({
          ...act,
          ...(act?.businessId === action?.data?.businessId ? action?.data : act),
        })),
        isLoading: false,
      };
    default:
      return state;
  }
}

export default businessReducer;