import { emprestimoConstants } from '../constants';
import { emprestimoService } from '../../services';
//import { alertActions } from './';
import { history } from '../../helpers';

export const emprestimoActions = {
    getAll,
    showForm,
    emprestimoCreate,
    emprestimoUpdate,
    emprestimoRemove,
    emprestimoGet
};

function showForm() {
    return dispatch => {
        dispatch({ type: emprestimoConstants.EMPRESTIMO_FORM_SHOW })
    }
}
function emprestimoGet(pessoa_id, beneficio_id, id) {
    return dispatch => {
        emprestimoService.emprestimoGet(pessoa_id, beneficio_id, id)
            .then(
                emprestimo => {
                    dispatch({ type: emprestimoConstants.EMPRESTIMO_LOADING, loading: true })
                    dispatch({ type: emprestimoConstants.EMPRESTIMO_GET, emprestimo })


                },
                error => console.log(error)
            )
    }
}

function getAll(pessoa_id, beneficio_id) {
    return dispatch => {
        emprestimoService.emprestimoGetAll(pessoa_id, beneficio_id)
            .then(
                emprestimos => {
                    dispatch({ type: emprestimoConstants.EMPRESTIMO_LOADING, loading: true })
                    dispatch({
                        type: emprestimoConstants.EMPRESTIMO_GETALL,
                        emprestimos,
                        loading: false
                    })

                },
                error => console.log(error)
            )
    }
}


function emprestimoCreate(pessoa_id, beneficio_id, emprestimo) {
    return dispatch => {
        emprestimoService.emprestimoCreate(pessoa_id, beneficio_id, emprestimo)
            .then(
                emprestimo => {
                    dispatch({
                        type: emprestimoConstants.EMPRESTIMO_CREATE,
                        emprestimo
                    })
                    history.push(`/pessoas/${pessoa_id}`)
                    history.go()

                },
                error => console.log(error)
            )
    }
}

function emprestimoUpdate(pessoa_id, beneficio_id, emprestimo) {
    return dispatch => {

        emprestimoService.emprestimoUpdate(pessoa_id, beneficio_id, emprestimo)
            .then(
                emprestimo => {
                    dispatch({
                        type: emprestimoConstants.EMPRESTIMO_UPDATE,
                        emprestimo

                    })
                    history.push(`/pessoas/${pessoa_id}`)
                    history.go()

                },
                error => console.log(error)
            )
    }


}


function emprestimoRemove(pessoa_id, beneficio_id, emprestimo) {
    return dispatch => {

        emprestimoService.emprestimoRemove(pessoa_id, beneficio_id, emprestimo.id)
            .then(
                success => {
                    dispatch({
                        type: emprestimoConstants.EMPRESTIMO_REMOVE
                    })
                    history.push(`/pessoas/${pessoa_id}`)
                    history.go()

                },
                error => console.log(error)
            )

    }
}
