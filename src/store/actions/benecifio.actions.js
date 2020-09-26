import { beneficioConstants } from '../constants';
import { beneficioService } from '../../services';
//import { alertActions } from './';
import { history } from '../../helpers';

export const beneficioActions = {
    getAll,
    showForm,
    beneficioCreate,
    beneficioUpdate,
    beneficioRemove,
    beneficioGet,
    beneficioConsulta
};

function showForm() {
    return dispatch => {
        dispatch({ type: beneficioConstants.BENEFICIO_FORM_SHOW })
    }
}
function beneficioGet(pessoa_id, id) {
    return dispatch => {
        beneficioService.beneficioGet(pessoa_id, id)
            .then(
                beneficio => {
                    dispatch({ type: beneficioConstants.BENEFICIO_LOADING, loading: true })
                    dispatch({ type: beneficioConstants.BENEFICIO_GET, beneficio })


                },
                error => console.log(error)
            )
    }
}
function beneficioConsulta(nb) {
    return dispatch => {
        beneficioService.beneficioConsulta(nb)
            .then(
                beneficio => {
                    dispatch({ type: beneficioConstants.BENEFICIO_LOADING, loading: true })
                    dispatch({ type: beneficioConstants.BENEFICIO_GET, beneficio })


                },
                error => console.log(error)
            )
    }
}
function getAll(pessoa_id) {
    return dispatch => {
        beneficioService.beneficioGetAll(pessoa_id)
            .then(
                beneficios => {
                    dispatch({ type: beneficioConstants.BENEFICIO_LOADING, loading: true })
                    dispatch({
                        type: beneficioConstants.BENEFICIO_GETALL,
                        beneficios,
                        loading: false
                    })

                },
                error => console.log(error)
            )
    }
}


function beneficioCreate(pessoa_id, beneficio) {
    return dispatch => {
        beneficioService.beneficioCreate(pessoa_id, beneficio)
            .then(
                beneficio => {
                    dispatch({
                        type: beneficioConstants.BENEFICIO_CREATE,
                        beneficio
                    })
                    history.push(`/pessoas/${pessoa_id}/beneficios`)
                    history.go()

                },
                error => console.log(error)
            )
    }
}

function beneficioUpdate(pessoa_id, beneficio) {
    return dispatch => {

        beneficioService.beneficioUpdate(pessoa_id, beneficio)
            .then(
                beneficio => {
                    dispatch({
                        type: beneficioConstants.BENEFICIO_UPDATE,
                        beneficio

                    })
                    history.push(`/pessoas/${pessoa_id}/beneficios`)
                    history.go()

                },
                error => console.log(error)
            )
    }


}


function beneficioRemove(pessoa_id, beneficio) {
    return dispatch => {

        beneficioService.beneficioRemove(pessoa_id, beneficio.id)
            .then(
                success => {
                    dispatch({
                        type: beneficioConstants.BENEFICIO_REMOVE
                    })
                    history.push(`/pessoas/${pessoa_id}/beneficios`)
                    history.go()

                },
                error => console.log(error)
            )

    }
}
