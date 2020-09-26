import { enderecoConstants } from '../constants';

export function enderecos(state = { enderecoFormShow: false, loading: true, items: [], enderecoUpdated: null }, action) {
  switch (action.type) {

    case enderecoConstants.ENDERECO_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case enderecoConstants.ENDERECO_GETALL:
      return {
        ...state,
        items: action.enderecos
      }
    case enderecoConstants.ENDERECO_FORM_SHOW:
      return {
        ...state,
        enderecoFormShow: !state.enderecoFormShow
      }
    case enderecoConstants.ENDERECO_GET:
      return {
        ...state,
        enderecoUpdated: action.endereco
      }
    default:
      return state
  }
}