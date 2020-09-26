import { pessoaConstants } from '../constants';
import { pessoaService } from '../../services';
//import { alertActions } from './';
import { history } from '../../helpers';

export const pessoaActions = {
    getAll,
    showForm,
    pessoaCreate,
    pessoaUpdate,
    pessoaRemove,
    pessoaGet,
    findPages
};

function showForm() {
    return dispatch => {
        dispatch({ type: pessoaConstants.PESSOA_FORM_SHOW })
    }
}
function pessoaGet(id) {
    return dispatch => {

        pessoaService.pessoaGetOne(id)
            .then(
                pessoa => {
                    dispatch({ type: pessoaConstants.PESSOA_LOADING, loading: true })

                    dispatch({ type: pessoaConstants.PESSOA_GET, pessoa })


                },
                error => console.log(error)
            )
    }
}

function getAll() {
    return dispatch => {
        dispatch({ type: pessoaConstants.PESSOA_LOADING })

        pessoaService.pessoaGetAll()
            .then(
                pessoas => {
                    dispatch({
                        type: pessoaConstants.PESSOA_GETALL,
                        pessoas
                    })

                },
                error => console.log(error)
            )
    }
}

function findPages(filtros) {
    return dispatch => {
        dispatch({ type: pessoaConstants.PESSOA_LOADING })

        pessoaService.pessoaFindPages(filtros)
            .then(
                pessoas => {

                    dispatch({
                        type: pessoaConstants.PESSOA_GETALL,
                        pessoas,
                        loading: false
                    })


                },
                error => console.log(error)
            )
    }
}
function pessoaCreate(pessoa) {
    return dispatch => {
        pessoaService.pessoaCreate(pessoa)
            .then(
                pessoa => {
                    dispatch({
                        type: pessoaConstants.PESSOA_CREATE,
                        pessoa
                    })
                    history.push(`/pessoas/${pessoa.id}`)
                    history.go()

                },
                error => console.log(error)
            )
    }
}

function pessoaUpdate(pessoa) {
    return dispatch => {

        pessoaService.pessoaUpdate(pessoa)
            .then(
                pessoa => {
                    dispatch({
                        type: pessoaConstants.PESSOA_UPDATE,
                        pessoa

                    })
                    history.push(`/pessoas`)
                    history.go()

                },
                error => console.log(error)
            )
    }


}


function pessoaRemove(pessoa) {
    return dispatch => {

        pessoaService.pessoaRemove(pessoa.id)
            .then(
                success => {
                    dispatch({
                        type: pessoaConstants.PESSOA_REMOVE
                    })
                    history.push(`/pessoas`)
                    history.go()

                },
                error => console.log(error)
            )

    }
}
