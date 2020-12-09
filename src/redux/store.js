import authReducer from "./authReducer";
import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";

const { createStore, combineReducers, applyMiddleware, compose } = require("redux");

let reducers = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
  users: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store