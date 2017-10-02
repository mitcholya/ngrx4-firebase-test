import * as auth from '../actions/auth';
import { User } from '../models/user';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  user: {
    displayName: '',
    email: '',
    emailVerified: false,
    isAnonymous: true,
    phoneNumber: '',
    photoURL: '',
    providerId: '',
    uid: ''
  },
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        // currentUser: state.user,
      };
    }

    case auth.GET_USER_COMPLETE: {
      return {
        user:  action.payload,
        loggedIn: state.loggedIn
      };
  }

    case auth.CHANGE_USER_NAME: {
      const newState = {
        loggedIn: state.loggedIn,
        user: Object.assign({}, state.user)
      }
      newState.user.displayName = action.payload;
      return newState;
    }

    case auth.UPDATE_USER_DATA: {
      return Object.assign({}, state, {
        user: action.payload
      })
    }

    // case auth.LOGIN_REDIRECT: {
    //   return initialState;
    // }

    case auth.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
