import { combineReducers } from "redux";
import businessModule from "../modules/business";
import personsModule from "../modules/persons";

export default combineReducers({
  business: businessModule.reducer,
  persons: personsModule.reducer,
});