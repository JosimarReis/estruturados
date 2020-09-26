import { cartaoConstants } from '../constants';

export function cartoes(state = { cartaoFormShow: false, loading: true, items: [], cartaoUpdated: null }, action) {
  switch (action.type) {

    case cartaoConstants.CARTAO_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case cartaoConstants.CARTAO_GETALL:
      return {
        ...state,
        items: action.cartaos
      }
    case cartaoConstants.CARTAO_FORM_SHOW:
      return {
        ...state,
        cartaoFormShow: !state.cartaoFormShow
      }
    case cartaoConstants.CARTAO_GET:
      return {
        ...state,
        cartaoUpdated: action.cartao
      }
    default:
      return state
  }
}