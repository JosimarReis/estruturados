import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ?
  { loggedIn: true, user, submitted: false } :
  { loggedIn: false, submitted: false, user: { email: '', senha: '' } };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.USER_LOGIN:
      return {
        ...state,
        loggingIn: true,
        user: action.user
      };
    case userConstants.USER_LOGOUT:
      return {
        loggingIn: false,
        user: {}
      };
    case userConstants.USER_SUBMIT:
      return {
        ...state,
        submitted: !state.submitted
      };
    default:
      return state
  }
}