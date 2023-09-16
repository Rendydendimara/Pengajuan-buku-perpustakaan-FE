import { Dispatch } from 'react';
// import { IUser } from '../../../interfaces/IUser';
import { ICartState } from './UserReducer';
import { UserActionTypes } from './UserTypes';

export const actionSetUser = (cart: any) => {
  return async (
    dispatch: Dispatch<UserActionTypes>,
    getState: () => ICartState
  ) => {
    dispatch({ type: 'SET_CART', cart: cart });
  };
};
