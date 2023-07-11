import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { IUserState, userReducer } from './User/UserReducer';

export interface ICombinedState {
  // penjual: IUserPenjualState;
  // adminProdi: IUserAdminProdiState;
  // adminUmum: IUserAdminUmumState;
  user: IUserState;
}

const appReducer = combineReducers({
  // penjual: userPenjualReducer,
  // adminUmum: userAdminUmumReducer,
  // adminProdi: userAdminProdiReducer,
  user: userReducer,
});

const middleware = [thunk];

export const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
