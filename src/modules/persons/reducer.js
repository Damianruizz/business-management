import { PERSONS_FETCH_STARTED } from "./actionTypes";

const initialState = {
  persons: [],
  isLoading: false,
};

const personsReducer = (state = initialState, action) => {
  switch(action.type) {
    case PERSONS_FETCH_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export default personsReducer;