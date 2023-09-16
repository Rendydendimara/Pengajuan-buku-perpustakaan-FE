// import { IUser } from '../../../interfaces/IUser';
import { UserActionTypes } from './UserTypes';

export interface ICartState {
  cart?: any;
}

const userReducerDefaultState: ICartState = {
  cart: undefined,
};

export const cartReducer = (
  state = userReducerDefaultState,
  action: UserActionTypes
): ICartState => {
  switch (action.type) {
    case 'SET_CART': {
      return {
        ...state,
        cart: action.cart,
      };
    }
    default:
      return state;
  }
};
