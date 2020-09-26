import { cartaoConstants } from '../constants';
import { cartaoService } from '../../services';
//import { alertActions } from './';
import { history } from '../../helpers';

export const cartaoActions = {
    getAll,
    showForm,
    cartaoCreate,
    cartaoUpdate,
    cartaoRemove,
    cartaoGet
};

function showForm() {
    return dispatch => {
        dispatch({ type: cartaoConstants.CARTAO_FORM_SHOW })
    }
}
function cartaoGet(pessoa_id, beneficio_id, id) {
    return dispatch => {
        cartaoService.cartaoGet(pessoa_id, beneficio_id, id)
            .then(
                cartao => {
                    dispatch({ type: cartaoConstants.CARTAO_LOADING, loading: true })
                    dispatch({ type: cartaoConstants.CARTAO_GET, cartao })


                },
                error => console.log(error)
            )
    }
}

function getAll(pessoa_id, beneficio_id) {
    return dispatch => {
        cartaoService.cartaoGetAll(pessoa_id, beneficio_id)
            .then(
                cartoes => {
                    dispatch({ type: cartaoConstants.CARTAO_LOADING, loading: true })
                    dispatch({
                        type: cartaoConstants.CARTAO_GETALL,
                        cartoes,
                        loading: false
                    })

                },
                error => console.log(error)
            )
    }
}


function cartaoCreate(pessoa_id, beneficio_id, cartao) {
    return dispatch => {
        cartaoService.cartaoCreate(pessoa_id, beneficio_id, cartao)
            .then(
                cartao => {
                    dispatch({
                        type: cartaoConstants.CARTAO_CREATE,
                        cartao
                    })
                    history.push(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/cartoes`)
                    history.go()

                },
                error => console.log(error)
            )
    }
}

function cartaoUpdate(pessoa_id, beneficio_id, cartao) {
    return dispatch => {

        cartaoService.cartaoUpdate(pessoa_id, beneficio_id, cartao)
            .then(
                cartao => {
                    dispatch({
                        type: cartaoConstants.CARTAO_UPDATE,
                        cartao

                    })
                    history.push(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/cartoes`)
                    history.go()

                },
                error => console.log(error)
            )
    }


}


function cartaoRemove(pessoa_id, beneficio_id, cartao) {
    return dispatch => {

        cartaoService.cartaoRemove(pessoa_id, beneficio_id, cartao.id)
            .then(
                success => {
                    dispatch({
                        type: cartaoConstants.CARTAO_REMOVE
                    })
                    history.push(`/pessoas/${pessoa_id}/beneficios/${beneficio_id}/cartoes`)
                    history.go()

                },
                error => console.log(error)
            )

    }
}
