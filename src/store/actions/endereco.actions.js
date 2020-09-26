import { enderecoConstants } from '../constants';
import { enderecoService } from '../../services';
//import { alertActions } from './';
import { history } from '../../helpers';

export const enderecoActions = {
    getAll,
    showForm,
    enderecoCreate,
    enderecoUpdate,
    enderecoRemove,
    enderecoGet
};

function showForm() {
    return dispatch => {
        dispatch({ type: enderecoConstants.ENDERECO_FORM_SHOW })
    }
}
function enderecoGet(pessoa_id, id) {
    return dispatch => {
        enderecoService.enderecoGet(pessoa_id, id)
            .then(
                endereco => {
                    dispatch({ type: enderecoConstants.ENDERECO_LOADING, loading: true })
                    dispatch({ type: enderecoConstants.ENDERECO_GET, endereco })


                },
                error => console.log(error)
            )
    }
}

function getAll(pessoa_id) {
    return dispatch => {
        enderecoService.enderecoGetAll(pessoa_id)
            .then(
                enderecos => {
                    dispatch({ type: enderecoConstants.ENDERECO_LOADING, loading: true })
                    dispatch({
                        type: enderecoConstants.ENDERECO_GETALL,
                        enderecos,
                        loading: false
                    })

                },
                error => console.log(error)
            )
    }
}


function enderecoCreate(pessoa_id, endereco) {
    return dispatch => {
        enderecoService.enderecoCreate(pessoa_id, endereco)
            .then(
                endereco => {
                    dispatch({
                        type: enderecoConstants.ENDERECO_CREATE,
                        endereco
                    })
                    history.push(`/pessoas/${pessoa_id}/enderecos`)
                    history.go()

                },
                error => console.log(error)
            )
    }
}

function enderecoUpdate(pessoa_id, endereco) {
    return dispatch => {

        enderecoService.enderecoUpdate(pessoa_id, endereco)
            .then(
                endereco => {
                    dispatch({
                        type: enderecoConstants.ENDERECO_UPDATE,
                        endereco

                    })
                    history.push(`/pessoas/${pessoa_id}/enderecos`)
                    history.go()

                },
                error => console.log(error)
            )
    }


}


function enderecoRemove(pessoa_id, endereco) {
    return dispatch => {

        enderecoService.enderecoRemove(pessoa_id, endereco.id)
            .then(
                success => {
                    dispatch({
                        type: enderecoConstants.ENDERECO_REMOVE
                    })
                    history.push(`/pessoas/${pessoa_id}/enderecos`)
                    history.go()

                },
                error => console.log(error)
            )

    }
}
