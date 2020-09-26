import { telefoneConstants } from '../constants';
import { telefoneService } from '../../services';
//import { alertActions } from './';
import { history } from '../../helpers';

export const telefoneActions = {
    getAll,
    showForm,
    telefoneCreate,
    telefoneUpdate,
    telefoneRemove,
    telefoneGet
};

function showForm() {
    return dispatch => {
        dispatch({ type: telefoneConstants.TELEFONE_FORM_SHOW })
    }
}
function telefoneGet(pessoa_id, id) {
    return dispatch => {
        telefoneService.telefoneGet(pessoa_id, id)
            .then(
                telefone => {
                    dispatch({ type: telefoneConstants.TELEFONE_LOADING, loading: true })
                    dispatch({ type: telefoneConstants.TELEFONE_GET, telefone })


                },
                error => console.log(error)
            )
    }
}

function getAll(pessoa_id) {
    return dispatch => {
        telefoneService.telefoneGetAll(pessoa_id)
            .then(
                telefones => {
                    dispatch({ type: telefoneConstants.TELEFONE_LOADING, loading: true })
                    dispatch({
                        type: telefoneConstants.TELEFONE_GETALL,
                        telefones,
                        loading: false
                    })

                },
                error => console.log(error)
            )
    }
}


function telefoneCreate(pessoa_id, telefone) {
    return dispatch => {
        telefoneService.telefoneCreate(pessoa_id, telefone)
            .then(
                telefone => {
                    dispatch({
                        type: telefoneConstants.TELEFONE_CREATE,
                        telefone
                    })
                    history.push(`/pessoas/${pessoa_id}/telefones`)
                    history.go()

                },
                error => console.log(error)
            )
    }
}

function telefoneUpdate(pessoa_id, telefone) {
    return dispatch => {

        telefoneService.telefoneUpdate(pessoa_id, telefone)
            .then(
                telefone => {
                    dispatch({
                        type: telefoneConstants.TELEFONE_UPDATE,
                        telefone

                    })
                    history.push(`/pessoas/${pessoa_id}/telefones`)
                    history.go()

                },
                error => console.log(error)
            )
    }


}


function telefoneRemove(pessoa_id, telefone) {
    return dispatch => {

        telefoneService.telefoneRemove(pessoa_id, telefone.id)
            .then(
                success => {
                    dispatch({
                        type: telefoneConstants.TELEFONE_REMOVE
                    })
                    history.push(`/pessoas/${pessoa_id}`)
                    history.go()

                },
                error => console.log(error)
            )

    }
}
