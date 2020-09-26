import { beneficioConstants } from '../constants';

export function beneficios(state = { beneficioFormShow: false, loading: true, items: [], beneficioUpdated: null }, action) {
  switch (action.type) {

    case beneficioConstants.BENEFICIO_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case beneficioConstants.BENEFICIO_GETALL:
      return {
        ...state,
        items: action.beneficios
      }
    case beneficioConstants.BENEFICIO_FORM_SHOW:
      return {
        ...state,
        beneficioFormShow: !state.beneficioFormShow
      }
    case beneficioConstants.BENEFICIO_GET:
      return {
        ...state,
        beneficioUpdated: action.beneficio
      }
    default:
      return state
  }
}