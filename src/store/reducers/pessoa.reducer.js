import { pessoaConstants } from '../constants';

export function pessoas(state = { pessoaFormShow: false, loading: true, items: [], pessoaUpdated: null }, action) {
  switch (action.type) {

    case pessoaConstants.PESSOA_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case pessoaConstants.PESSOA_GETALL:
      return {
        ...state,
        items: action.pessoas
      }
    case pessoaConstants.PESSOA_FIND:
      return {
        ...state,
        items: action.rows
      }
    case pessoaConstants.PESSOA_FORM_SHOW:
      return {
        ...state,
        pessoaFormShow: !state.pessoaFormShow
      }
    case pessoaConstants.PESSOA_GET:
      return {
        ...state,
        pessoaUpdated: action.pessoa
      }
    default:
      return state
  }
}