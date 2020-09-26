import { telefoneConstants } from '../constants';

export function telefones(state = { telefoneFormShow: false, loading: true, items: [], telefoneUpdated: null }, action) {
  switch (action.type) {

    case telefoneConstants.TELEFONE_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case telefoneConstants.TELEFONE_GETALL:
      return {
        ...state,
        items: action.telefones
      }
    case telefoneConstants.TELEFONE_FORM_SHOW:
      return {
        ...state,
        telefoneFormShow: !state.telefoneFormShow
      }
    case telefoneConstants.TELEFONE_GET:
      return {
        ...state,
        telefoneUpdated: action.telefone
      }
    default:
      return state
  }
}