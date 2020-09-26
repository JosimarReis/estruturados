import { emprestimoConstants } from '../constants';

export function emprestimos(state = { emprestimoFormShow: false, loading: true, items: [], emprestimoUpdated: null }, action) {
  switch (action.type) {

    case emprestimoConstants.EMPRESTIMO_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case emprestimoConstants.EMPRESTIMO_GETALL:
      return {
        ...state,
        items: action.emprestimos
      }
    case emprestimoConstants.EMPRESTIMO_FORM_SHOW:
      return {
        ...state,
        emprestimoFormShow: !state.emprestimoFormShow
      }
    case emprestimoConstants.EMPRESTIMO_GET:
      return {
        ...state,
        emprestimoUpdated: action.emprestimo
      }
    default:
      return state
  }
}