import { userConstants } from '../constants';
let user = JSON.parse(localStorage.getItem('user')) || null;
export function users(state = {
  loggedIn: user !== null ? true : false, userFormShow: false, pass: false,
  loading: true, items: [], user: user, userUpdated: null
}, action) {
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
    case userConstants.USER_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case userConstants.USER_GETALL:
      return {
        ...state,
        items: action.users
      }
    case userConstants.USER_FORM_SHOW:
      return {
        ...state,
        userFormShow: !state.userFormShow
      }

    case userConstants.USER_PASS:
      return {
        ...state,
        pass: !state.pass
      }
    case userConstants.USER_GET:
      return {
        ...state,
        userUpdated: action.user
      }

    default:
      return state
  }
}