import { combineReducers } from "redux";
import undoable from "redux-undo";
import countReducer from "./count";

export default combineReducers({
  count: undoable(countReducer, {
    undoType: "UNDO_COUNT",
    redoType: "REDO_COUNT",
  }),
});
