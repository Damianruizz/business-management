import { BUSINESSES_FETCH_STARTED } from "./actionTypes";

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
    default:
      return state;
  }
}

export default businessReducer;